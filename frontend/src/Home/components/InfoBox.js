import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "rgb(251 241 225)",
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 10,
  fontWeight: 300,
  padding: "10px 12px",
  borderRadius: 0,
  border: "1px solid #555",
  background: "white",
  width: "100%",
  outline: "none",
  color: theme.palette.primary.main,
}));

export default function InfoBox({ address }) {
  const link = `${window.origin}?ref=${address}`;

  return (
    <CardWrapper className="wrapper" style={{marginBottom: "20px"}}>
      <CardContent style={{ paddingLeft: 8, paddingRight: 8 }}>
        {/* <Typography gutterBottom variant="h5" textAlign="center">
          Referral Link
        </Typography>
        <Input value={address ? link : ""} readOnly /> */}
        <Typography
          textAlign="center"
          variant="body2"
          marginTop={2}
          paddingX={3}
        >
          People have to Multiply at least 5 times in 5 days before they can claim.
        </Typography>
      </CardContent>
    </CardWrapper>
  );
}
