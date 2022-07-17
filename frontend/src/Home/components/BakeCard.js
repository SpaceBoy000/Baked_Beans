/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { AiOutlineCopy } from "react-icons/ai";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Web3 from "web3";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";
import Connect from "./Connect";
import { Toast } from "../../util"
import logoTitle from "../../assets/logo-title.png";

const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: "1000px",
  width: "70%",
  margin: "0 auto",
  color: "white",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    width: "90%"
  },
}));


const Logo = styled("img")(({ theme }) => ({
  margin: "auto",
}));

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

let timeout = null;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const copyfunc = async (text) => {
  try {
    const toCopy = text;
    await navigator.clipboard.writeText(toCopy);
    Toast.fire({
      icon: 'success',
      title: "Copied to clipboard!"
    });
  }
  catch (err) {
    console.error('Failed to copy: ', err);
  }
}

export const numberWithCommas = (x, digits = 3) => {
  return Number(x).toLocaleString(undefined, { maximumFractionDigits: digits });
}

export default function BakeCard() {
  const { contract, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } =
    useContractContext();
  const vidRef = useRef(null);
  const { address, chainId } = useAuthContext();
  const [contractBNB, setContractBNB] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    bnb: 0,
    beans: 0,
    rewards: 0,
  });
  const [referralCount, setReferralCount] = useState(0);
  const [referralAmount, setReferralAmount] = useState(0);
  const [bakeBNB, setBakeBNB] = useState(0);
  const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);
  const [win, setWin] = useState(null);
  const query = useQuery();

  const link = `${window.origin}?ref=${address}`;
  // console.log("link: ", link);

  const nutritionFacts = [
    {
      label: "Daily Return",
      value: 8,
    },
    {
      label: "APR",
      value: "2,920",
    },
    {
      label: "Dev Fee",
      value: 2,
    },
    {
      label: "Treasury",
      value: 2,
    },
    {
      label: "Invested Back in Amplifier",
      value: 3,
    },
  ];

  const fetchContractBNBBalance = () => {
    if (!web3 || wrongNetwork) {
      setContractBNB(0);
      return;
    }
    getBnbBalance(config.contractAddress).then((amount) => {
      setContractBNB(fromWei(amount));
    });
  };

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
      setReferralCount(0);
      setReferralAmount(0);

      return;
    }

    try {
      const [bnbAmount, beansAmount, rewardsAmount] = await Promise.all([
        getBnbBalance(address),
        contract.methods
          .getMyMiners()
          .call({from: address})
          .catch((err) => {
            console.error("myminers", err);
            return 0;
          }),
        contract.methods
          .beanRewards()
          .call({from: address})
          .catch((err) => {
            console.error("beanrewards", err);
            return 0;
          }),
      ]);
      setWalletBalance({
        bnb: fromWei(`${bnbAmount}`),
        beans: beansAmount,
        rewards: fromWei(`${rewardsAmount}`),
      });

      console.log("rewardsAmount: ", rewardsAmount, " : ", fromWei(`${rewardsAmount}`));

      const [referralCount, referralAmount] = await Promise.all([
        contract.methods.totalreferralCount(address)
                .call()
                .catch((err) => {
                  console.error("fetch error", err);
                  return 0;
                }),
        contract.methods.totalClaimedEggs(address)
                .call()
                .catch((err) => {
                  console.error("fetch error", err);
                  return 0;
                }),
      ]);

      const rewards = await contract.methods.calculateEggSell(referralAmount)
                .call()
                .catch((err) => {
                  console.error("fetch error", err);
                  return 0;
                });

      setReferralCount(referralCount);
      setReferralAmount(fromWei(`${rewards}`));

      console.log("referralCount: ", referralCount);
      console.log("referralAmount: ", fromWei(`${rewards}`));
    } catch (err) {
      console.error(err);
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
      setReferralCount(0);
      setReferralAmount(0);
    }
  };

  useEffect(() => {
    fetchContractBNBBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address, web3, chainId]);

  const onUpdateBakeBNB = (value) => {
    setBakeBNB(value);
  };

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0xCB376BaAf5216F392F116F1907b1F4578E464308";
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.buyEggs(ref).send({
        from: address,
        value: toWei(`${bakeBNB}`),
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  const reBake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.hatchEggs(ref).send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.sellEggs().send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Wrapper>
        {/* {loading ? <Logo src={logoGif} ref={vidRef} id="video1" alt="site logo" /> : <Logo src={logoPng} ref={vidRef} id="video1" alt="site logo" />} */}
        {/* <div className="font-effect-shadow-multiple" style={{ fontWeight: "bold", fontSize: "70px", color: "#c0c602", marginBottom: "20px", marginLeft: "10px", fontFamily: "monospace", textAlign:"center" }}> BNB BANK</div> */}
        <img src={ logoTitle } alt="" className="logoTitle"/>
        <Connect responsive = { false }/>
        <p className="title">
          The BNB Pool with the finest daily return and highest referral reward
        </p>

        <div className="dashboard">Dashboard</div>
        <div className="main-board">
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>Contract</div>
            <div>{ contractBNB } BNB</div>
          </Grid>
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>Wallet</div>
            <div>{ walletBalance.bnb } BNB</div>
          </Grid>
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>Your Baked BNB</div>
            <div>{ walletBalance.beans } Baked BNB</div>
          </Grid>

          <input 
            className="input-box"
            type="number"
            min={0}
            max={+walletBalance.bnb}
            value={bakeBNB}
            placeholder="Enter BNB Amount"
            onChange={ e => {setBakeBNB(e.target.value)}}>
          </input>
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div className="input-box" style={{width:"49%", padding:"10px 5px"}}>
              <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                <div>Min</div>
                <div>0.1 BNB</div>
              </Grid>
            </div>
            <div className="input-box" style={{width:"49%", padding:"10px 5px"}}>
              <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                <div>Max</div>
                <div>50 BNB</div>
              </Grid>
            </div>
          </Grid>
          <button 
            className="main-button"
            disabled={wrongNetwork || !address || +bakeBNB === 0 || loading}
            onClick={ bake }
          >
            Bake BNB
          </button>

          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>Your Earnings</div>
            <div>{ walletBalance.rewards } BNB</div>
          </Grid>

          <button
            className="main-button"
            disabled={wrongNetwork || !address || loading}
            onClick={reBake}
          >
            RE-BAKE
          </button>

          <button 
            className="main-button"
            disabled={wrongNetwork || !address || loading}
            onClick={eatBeans}
          >
            EAT BNB
          </button>

          {/* <div style={{ textAlign:"center" }}>6.66% Daily Return for 30 days - 200% ROI(no limits, deposit any amount any times)</div>
          <div style={{ textAlign:"center" }}>10% Referral Reward | 10% Dev fee (not affect on your deposit and earnings amount)</div> */}
        </div>
        <div className="dashboard">Nutrition Facts</div>
        <div className="main-board">
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>Daily Return</div>
            <div>6.67%</div>
          </Grid>
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>APR</div>
            <div>2400%</div>
          </Grid>
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>Dev Fee</div>
            <div>10%</div>
          </Grid>
        </div>

        <div className="dashboard">Referral Link</div>
        <div className="main-board">
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>Invited</div>
            <div>{ referralCount } Users</div>
          </Grid>
          <Grid style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
            <div>Earned</div>
            <div>{ referralAmount } BNB</div>
          </Grid>
          <div style={{width: "100%", display:"flex", alignItems:"center", position: "relative"}}>
            <input 
              className="input-box"
              value = { address ? link: ''}
              placeholder="Connect Wallet"
              sx={{border: 'none'}}
              readOnly>
            </input>
            <div style={{position:"absolute", right: "0px", top:"0px", bottom:"0px", height: "100%", display: "flex", alignItems:"center"}}>
              <AiOutlineCopy className="copyIcon"  onClick={() => { copyfunc(link) }}/> 
            </div>
          </div>
          <div style={{ textAlign:"center" }}>Earn 10% of the BNB used to BAKE BNB from anyone who uses your referral link</div>
        </div>
      </Wrapper>
      
    </div>
  );
}
