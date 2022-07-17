import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import TwitterIcon from '@mui/icons-material/Twitter';  
import TelegramIcon from '@mui/icons-material/Telegram';
import { FaDiscord } from 'react-icons/fa';
import { SiBinance } from 'react-icons/si';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { IconButton } from "@mui/material";
import '../index'
import { config } from "../../config"
const SocailIcon = styled(IconButton)(({ theme }) => ({
  background: "#123F49",
  color: "white",
  margin: "20px 3px 0 3px",
  borderRadius: "30px",
  "&:hover" :{
    color: "#C5AC70",
    background: "trasparent",   
    transition: ".5s all"
  }

}));

const FooterBox = styled(Box)(
  ({ theme }) => `
  @media only screen and (max-width: 900px){
    margin-top: 30px;
  }

  @media only screen and (max-width: 376px){
    margin-top: 70px;
  }
`,);

export default function Footer() {
  return (
    <>
      <FooterBox component="div" sx={{ px: 2, textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="socialicon_wrap">
              <a href="https://mobile.twitter.com/bakedbnb" target="_blank">
                <SocailIcon><TwitterIcon  /></SocailIcon>
              </a>
              <a href="https://t.me/Bakedbnb" target="_blank">
                <SocailIcon><TelegramIcon /></SocailIcon>
              </a>
              {/* <a href="https://discord.gg/ZC4Q49e7uE" target="_blank">
                <SocailIcon><FaDiscord /></SocailIcon>
              </a> */}
              <a href="https://baked-bnb.gitbook.io/welcome-to-gitbook/" target="_blank">
                <SocailIcon><AutoStoriesIcon  /></SocailIcon>
              </a>
              <a href={ config.scanLink } target="_blank">
                <SocailIcon><SiBinance  /></SocailIcon>                       
              </a>
              <a href="" target="_blank">
                <SocailIcon><VerifiedUserRoundedIcon  /></SocailIcon>
              </a>
            </Box>
          </Grid>
        </Grid> 
      </FooterBox>
    </>
  );
}
