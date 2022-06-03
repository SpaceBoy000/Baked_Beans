import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "rgb(255 252 248)",
  marginBottom: 24,
});

const nutritionFacts = [
  {
    label: "Daily Return",
    value: 10,
  },
  {
    label: "APR",
    value: "3,650",
  },
  {
    label: "Dev Fee",
    value: 6, 
  },
];

export default function NutritionFacts() {
  return (
    <div style={{width: "65%"}}>
        <Typography variant="h5" style={{color:"#49221a", fontSize:"25px"}}>
          <b>Nutrition Facts</b>
        </Typography>
        <Box paddingTop={1}>
          {nutritionFacts.map((f) => (
            <div className="dataRow">
              <div className="name">{f.label}</div>
              <div className="value">{f.value}%</div>
            </div>
          ))}
        </Box>
    </div>
  );
}
