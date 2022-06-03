import { fontSize, styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Connect from "./components/Connect";
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import NutritionFacts from "./components/NutritionFacts";
import ReferralLink from "./components/ReferralLink";
import { useAuthContext } from "../providers/AuthProvider";
import Footer from "./components/Footer";
import imgLogo from '../assets/logo.png';
import grillImage from '../assets/grill.png';
// import imgRat from '../assets/'
import { config } from "../config";
import esIcon from "../assets/ESIcon.png";
import tgIcon from "../assets/TGIcon.png";
import twIcon from "../assets/TWIcon.png";

const Wrapper = styled("div")(({ theme }) => ({
  // maxWidth: 800,
  // maxWidth: "80%",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export default function Home() {
  const { address } = useAuthContext();

  return (
    <Wrapper>
      <div className="home">
        <div className="container">
          <div className="header">
            <div className="walletWrapper" align='middle'>
              <Connect />
            </div>
            <img src={imgLogo} alt="logo" class="logo" data-xblocker="passed" style={{visibility: "visible"}}></img>
            {/* <div style={{fontSize:"50px"}}>Snitch Coin</div> */}
            <div className="socialMedias">
              <a href={config.scanLink} target="__blank">
                <img src={esIcon} alt="" width={27} height={27} />
              </a>
              <a href="https://twitter.com/stepnfinance" target="__blank">
                <img src={twIcon} alt="" width={27} height={22} />
              </a>
              <a href="https://t.me/stepnfi" target="__blank">
                <img src={tgIcon} alt="" width={27} height={23} />
              </a>
            </div>
          </div>
          <p class="slogan" style={{marginTop:"1rem"}}>The BNB Reward Pool with the 10% daily return and 13% referral rewards and lowest dev fee
          </p>
          <div class="buttonGroup">
            <a href="/whitepaper.pdf" target="_blank" rel="noopener noreferrer">
              <div class="whitepaper">Whitepaper</div>
            </a>
            {/* <a href="/static/media/audit.f1590bcb.pdf" target="_blank" rel="noopener noreferrer">
              <div class="whitepaper">AUDIT</div>
            </a> */}
          </div>
          <div className="mainContent">
            <div className="box leftBox">
              <BakeCard />
            </div>
            <div className="box rightBox">
              <div className="contractInfo">
                <img src={grillImage}></img>
                <NutritionFacts />
              </div>
              <div>
                <ReferralLink address={address} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
