import { useRef } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import logo from "../../assets/FullLogo.png";
// import logoVideo from "../../assets/logo.gif"
import Connect from "./Connect";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));

export default function Header() {
  const vidRef = useRef(null);
  return (
    <Wrapper>
      {/* <img src={logo} alt="" width={"25%"} style={{ marginTop: "0px", marginBottom: "20px"}} /> */}
      {/* <video ref={vidRef} src={logoVideo} width={"280%"} type="video/mp4"></video> */}
      <Connect responsive={false} />
      <div className="font-effect-neon" style={{fontWeight: "bold", fontSize: "60px", color: "#e30feb", marginBottom: "10px", marginLeft: "10px", fontFamily: "monospace"}}> Amplifier</div>
      <Typography variant="h6" marginTop={-3}>
        <br/> The First PLS Miner <br/><br/>The PLS Reward Pool with the highest daily return and lowest dev fee
      </Typography>
    </Wrapper>
  );
}
