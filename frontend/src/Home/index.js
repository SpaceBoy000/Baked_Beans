import { styled } from "@mui/system";

import Connect from "./components/Connect";
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import NutritionFacts from "./components/NutritionFacts";
import ReferralLink from "./components/ReferralLink";
import InfoBox from "./components/InfoBox";
import { useAuthContext } from "../providers/AuthProvider";
import Footer from "./components/Footer";

const Wrapper = styled("div")(({ theme }) => ({
  
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export default function Home() {
  const { address } = useAuthContext();

  return (
    <Wrapper>
      <Connect />
      {/* <Header /> */}
      <BakeCard />
      {/* <NutritionFacts />
      <InfoBox/> */}
      {/* <ReferralLink address={address} /> */}
      <Footer />
    </Wrapper>
  );
}
