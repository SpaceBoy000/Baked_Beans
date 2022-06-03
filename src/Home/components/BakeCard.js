/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Web3 from "web3";

import PriceInput from "../../components/PriceInput";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { Toast } from "../../util"

const CardWrapper = styled(Card)({
  background: "rgb(251 241 225)",
  marginBottom: 24,
});

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

export default function BakeCard() {
  const { contract, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } =
    useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBNB, setContractBNB] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    bnb: 0,
    beans: 0,
    rewards: 0,
  });
  const [bakeBNB, setBakeBNB] = useState(0);
  const [intervalID, setIntervalID] = useState();
  const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

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
      console.log("mcb=>beansAmount: ", beansAmount);
      setWalletBalance({
        bnb: fromWei(`${bnbAmount}`),
        beans: beansAmount,
        rewards: fromWei(`${rewardsAmount}`),
      });
    } catch (err) {
      console.error(err);
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
      });
    }
  };

  // const getRewards = async () => {
  //   if (!web3 || wrongNetwork || !address) {
  //     setWalletBalance({
  //       bnb: 0,
  //       beans: 0,
  //       rewards: 0,
  //     });
  //     return;
  //   }

  //   const rewardAmount = await contract.methods.beanRewards()
  //         .call({from: address})
  //         .catch((err) => {
  //           console.error(err);

  //         })
  // }

  useEffect(() => {
    fetchContractBNBBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
    clearInterval(intervalID);
    const id = setInterval(() => fetchWalletBalance(), 3000);
    setIntervalID(id);
  }, [address, web3, chainId]);

  const onUpdateBakeBNB = (value) => {
    setBakeBNB(value);
  };

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0x0000000000000000000000000000000000000000";
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
    <div>
      {loading && <LinearProgress color="secondary" />}
      <div>
        <div className="dataRow">
          <div className="name">Contract</div>
          <div className="value">{contractBNB} BNB</div>
        </div>
        <div className="dataRow">
          <div className="name">Wallet</div>
          <div className="value">{walletBalance.bnb} BNB</div>
        </div>
        <div className="dataRow">
          <div className="name">Your Cookie</div>
          <div className="value">{walletBalance.beans} COOKIE</div>
        </div>

        <Box >
          <Box>
            <PriceInput
              max={+walletBalance.bnb}
              value={bakeBNB}
              onChange={(value) => onUpdateBakeBNB(value)}
            />
          </Box>
          <Box marginTop={2} marginBottom={2}>
            <Button
              className="button1"
              variant="contained"
              fullWidth
              disabled={wrongNetwork || !address || +bakeBNB === 0 || loading}
              onClick={bake}
            >
              <b>GET COOKIE</b>
            </Button>
          </Box>
          <Divider />
          <div className="dataRow">
            <div className="name">Your Rewards</div>
            <div className="value">{walletBalance.rewards} BNB</div>
          </div>

          {/* <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="body1" fontWeight="bolder">
              Your Rewards
            </Typography>
            <Typography variant="h5" fontWeight="bolder">
              {walletBalance.rewards} BNB
            </Typography>
          </Grid> */}
          <ButtonContainer container>
            <Grid item flexGrow={1} marginRight={1} marginTop={3}>
              <Button
                className="button1"
                variant="contained"
                color="secondary"
                fullWidth
                disabled={wrongNetwork || !address || loading}
                onClick={reBake}
              >
                <b>RE-BAKE</b>
              </Button>
            </Grid>
            <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
              <Button
                className="button1"
                variant="contained"
                color="secondary"
                fullWidth
                disabled={wrongNetwork || !address || loading}
                onClick={eatBeans}
              >
                <b>EAT NOW</b>
              </Button>
            </Grid>
          </ButtonContainer>
        </Box>
      </div>
    </div>
  );
}
