import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Toast } from "../../util"
import { styled } from "@mui/system";
import { faDiagramSuccessor } from "@fortawesome/free-solid-svg-icons";

const CardWrapper = styled(Card)({
  background: "rgb(251 241 225)",
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 14,
  fontWeight: 300,
  padding: "5px 20px",
  borderRadius: "40px",
  border: "2px solid #e58f0e",
  backgroundColor: "transparent",
  width: "100%",
  outline: "none",
  // color: theme.palette.primary.main,
  color: "#e58f0e",
  maxWidth:"70%"
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
      <p>Earn 13% of the BNB used to stack cheese from anyone who uses your referral link</p>
      <div class="refWrapper">
        <Input value={address ? link : ""} readOnly />
        <div 
          class="copyButton"
          onClick={e => copyfunc(address ? link : "")}
          >
          COPY
        </div>
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
