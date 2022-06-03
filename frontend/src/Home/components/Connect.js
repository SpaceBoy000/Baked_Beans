import Button from "@mui/material/Button";
import { styled } from "@mui/system";

import { useAuthContext } from "../../providers/AuthProvider";

const ConnectButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  right: 48,
  top: 48,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  backgroundColor: "#fbf1e1",
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
  backgroundColor: "#43a5f3",
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
