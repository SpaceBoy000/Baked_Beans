// import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
import { Toast } from "../../util"
import { Box, styled } from "@mui/system";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { faDiagramSuccessor } from "@fortawesome/free-solid-svg-icons";

const CardWrapper = styled(Card)({
  background: "rgb(251 241 225)",
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 14,
  fontWeight: "bold",
  padding: "5px 20px",
  borderRadius: "10px",
  border: "2px solid black",
  backgroundColor: "transparent",
  width: "100%",
  outline: "none",
  // color: theme.palette.primary.main,
  color: "black",
  maxWidth: "70%"
}));

const copyfunc = async (text) => {
  try {
    const toCopy = text;
    await navigator.clipboard.writeText(toCopy);
    Toast.fire({
      icon: 'success',
      title: "Copied to clipboard!"
    });

    // console.log('Text or Page URL copied');
  }
  catch (err) {
    console.error('Failed to copy: ', err);
  }
}

export default function ReferralLink({ address }) {
  const link = `${window.origin}?ref=${address}`;

  return (
    <div className="referral">
      <h1>Referral Link</h1>
      <p>Earn 15% of the BNB used to Cookie from anyone who uses your referral link</p>
      <div class="refWrapper">
        <Input value={address ? link : ""} readOnly />
        <Box>
          <Button
            className="copyButton"
            variant="contained"
            color="secondary"
            disabled={!address}
            onClick={e => copyfunc(address ? link : "")}
          >
            COPY
          </Button>
        </Box>
      </div>

      {/* <Typography
        textAlign="center"
        variant="body2"
        marginTop={2}
        paddingX={3}
        color="#e58f0e"
      >
        Earn 12% of the BNB used to bake beans from anyone who uses your
        referral link
      </Typography> */}
    </div>
  );
}
