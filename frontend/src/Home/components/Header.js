import { useRef } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Connect from "./Connect";

const Wrapper = styled("div")(({ theme }) => ({
  // textAlign:"center",
  padding: "20px 70px",
  display: "flex",
  justifyContent:"space-between",
  float: "right",
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
      {/* <img src="./favicon.png" alt="" className="logo"/> */}
      <Connect/>
    </Wrapper>
  );
}
