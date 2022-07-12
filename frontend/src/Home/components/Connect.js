import Button from "@mui/material/Button";
import { styled } from "@mui/system";

import { useAuthContext } from "../../providers/AuthProvider";

const ConnectButton = styled(Button)(({ theme }) => ({
  background: "#C5AC70 !important",
  borderRadius: "16px",
  // marginTop: "-40px",
  padding: "20px",
  fontFamily: 'Krona One',
  float: "right",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "20px",
  /* identical to box height, or 100% */
  letterSpacing: "0.0703846px",
  color: "#FFFFFF",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  // '&:hover' : {

  // }
}));

const SmallScreenConnectButton = styled(Button)(({ theme }) => ({
  display: "none",
  marginTop: "20px",
  marginBottom: 48,
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "#C5AC70",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export function shorten(str) {
  if (str.length < 10) return str;
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export default function Connect({ responsive = true }) {
  const { address, loading, connect, disconnect } = useAuthContext();

  return responsive ? (
    <ConnectButton
      color="secondary"
      variant="contained"
      disabled={loading}
      className="mybutton"
      onClick={() => (address ? disconnect() : connect())}
    >
      {address ? shorten(address) : "Connect"}
    </ConnectButton>
  ) : (
    <SmallScreenConnectButton
      color="secondary"
      variant="contained"
      disabled={loading}
      onClick={() => (address ? disconnect() : connect())}
    >
      {address ? shorten(address) : "Connect"}
    </SmallScreenConnectButton>
  );
}
