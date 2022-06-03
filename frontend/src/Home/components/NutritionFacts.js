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
    value: 8,
  },
  {
    label: "APR",
    value: "2,920",
  },
  {
    label: "Dev Fee",
    value: 2,
  },
  {
    label: "Treasury",
    value: 2,
  },
  {
    label: "Invested Back in Amplifier",
    value: 3,
  },
];

export default function NutritionFacts() {
  return (
    <CardWrapper className="wrapper">
      <CardContent>
        <Typography variant="h5" borderBottom="6px solid" paddingBottom={1}>
          Power Readings
        </Typography>
        <Box paddingTop={2}>
          {nutritionFacts.map((f) => (
            <Grid container key={f.label} justifyContent="space-between">
              <Typography variant="body1" gutterBottom>
                {f.label}
              </Typography>
              <Typography gutterBottom>{f.value}%</Typography>
            </Grid>
          ))}
        </Box>
        {/* <div style={{marginTop: "15px", fontSize: "18px", color: "blue"}}>
          <b>People have to Multiply 5 times before they claim.</b>
        </div> */}
      </CardContent>
    </CardWrapper>
  );
}
