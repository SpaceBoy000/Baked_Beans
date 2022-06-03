import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const BnbInput = styled("input")({
  fontSize: 24,
  fontWeight: 500,
  padding: "8px 50px 8px 20px",
  textAlign: "center",
  color: "black",
  borderRadius: 10,
  border: "2px solid black",
  background: "white",
  width: "100%",
  outline: "none",
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
    MozAppearance: "textfield",
  },
});

export default function PriceInput({ value, max, onChange = () => {} }) {
  return (
    <Box position="relative">
      <BnbInput
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Typography
        fontSize={24}
        position="absolute"
        top={9}
        right={18}
        fontWeight={500}
        color="black"
      >
        BNB
      </Typography>
    </Box>
  );
}
