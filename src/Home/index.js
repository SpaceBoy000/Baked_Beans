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
// import grillImage from '../assets/grill.png';
// import imgRat from '../assets/'
import { config } from "../config";
import esIcon from "../assets/ESIcon.png";
import tgIcon from "../assets/TGIcon.png";
import twIcon from "../assets/TWIcon.png";
import fbIcon from "../assets/FBIcon.png";
import ybIcon from "../assets/YBIcon.png";
import inIcon from "../assets/INIcon.png";

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
        <div className="container" style={{textAlign:"center"}}>
          <div className="header">
            <div className="socialMedias">
              <a href="https://facebook.com/cookielandfarm/" target="__blank">
                <img src={fbIcon} alt=""  />
              </a>
              <a href="https://www.instagram.com/cookielandfarm/" target="__blank">
                <img src={inIcon} alt=""  />
              </a>
              <a href="https://bit.ly/YouTube-CookieLand" target="__blank">
                <img src={ybIcon} alt=""  />
              </a>
              <a href="https://twitter.com/cookielandfarm" target="__blank">
                <img src={twIcon} alt=""  />
              </a>
              <a href="https://t.me/cookielandfarm" target="__blank">
                <img src={tgIcon} alt=""  />
              </a>
              <a href={config.scanLink} target="__blank">
                <img src={esIcon} alt=""  />
              </a>
            </div>
            <img src={imgLogo} alt="logo" class="logo" data-xblocker="passed"></img>
            <div className="walletWrapper" align='middle'>
              <Connect />
            </div>
          </div>
          <iframe src="https://free.timeanddate.com/countdown/i8codjw4/cf12/cm0/cu4/ct0/cs0/ca0/co1/cr0/ss0/cacfff/cpc000/pct/tcfff/fs200/szw320/szh135/tac000/tpc000/iso2022-06-07T18:00:00" allowtransparency="true" frameborder="0" width="217" height="58"></iframe>
          <div style={{display:"flex", justifyContent:"center"}}>
            <p class="slogan" style={{lineHeight:"25px", width:"400px", marginTop:"1rem"}}>The BNB Reward Pool with the 12% daily return and 15% referral rewards and lowest dev fee
            </p>
          </div>
          <div class="buttonGroup">
            <a href="https://docdro.id/VSIGjMA" target="_blank" rel="noopener noreferrer">
              <div class="whitepaper">Whitepaper</div>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <div class="whitepaper">AUDIT</div>
            </a>
          </div>
          <div className="mainContent">
            <div className="box leftBox">
              <BakeCard />
            </div>
            <div className="box rightBox">
              <div className="contractInfo">
                {/* <img src={grillImage}></img> */}
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
