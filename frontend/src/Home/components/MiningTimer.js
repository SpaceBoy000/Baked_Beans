import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import { styled } from "@mui/system";
// import { useTranslation } from "react-i18next";

const CardWrapper = styled("div")(({ theme }) => ({
  maxWidth: 400,
  margin: "20px auto 24px auto",
  padding: "29px",
  background: 'white',
  borderRadius: "5px",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  color: theme.typography.allVariants.color,
}));


export default function MiningTimer() {
  const [countup, setCountup] = useState({
    alive: true,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const intervalID = setInterval(() => {
      try {
        const data_ = getCountup();

        setCountup({
          alive: data_.total > 0,
          days: data_.days,
          hours: data_.hours,
          minutes: data_.minutes,
          seconds: data_.seconds,
        })
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => {
      clearInterval(intervalID)
    }
  }, [])

  const deployTime = 1667370800;
  const getCountup = () => {
    // const last = Number(Date.parse(deployTime) / 1000);
    const last = deployTime;
    const now = Date.now() / 1000;
    const total = last > 0 ? Math.abs(now - last, 0) : 0;
    const seconds = Math.floor((total) % 60);
    const minutes = Math.floor((total / 60) % 60);
    const hours = Math.floor((total / (60 * 60)) % 24);
    const days = Math.floor(total / (60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  const getMiningTitle = () => {
    const last = deployTime;
    const now = Date.now() / 1000;
    if (now < last) {
      return "MINING STARTS IN:";
    } else {
      return "RUNNING TIME:";
    }
  }

  function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  return (
    <>
      <div style={{width: "100%", textAlign:"center", marginTop:"40px"}}>
        <Typography variant="body5" sx={{ mb: 1 }}>
          {getMiningTitle()}
        </Typography>
      </div>

      <CardWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body5" sx={{ mb: 1 }}>
              {countup.days}
            </Typography>
            <div></div>
            <Typography variant="body7" sx={{ mb: 1 }}>
              DAYS
            </Typography>
          </Box>

          <Typography variant="body5" sx={{ mb: 1 }}>
            :
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body5" sx={{ mb: 1 }}>
              {padLeadingZeros(countup.hours, 2)}
            </Typography>
            <div></div>
            <Typography variant="body7" sx={{ mb: 1 }}>
              HOURS
            </Typography>
          </Box>

          <Typography variant="body5" sx={{ mb: 1 }}>
            :
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body5" sx={{ mb: 1 }}>
              {padLeadingZeros(countup.minutes, 2)}
            </Typography>
            <div></div>
            <Typography variant="body7" sx={{ mb: 1 }}>
              MINUTES
            </Typography>
          </Box>

          <Typography variant="body5" sx={{ mb: 1 }}>
            :
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body6" sx={{ mb: 1 }}>
              {padLeadingZeros(countup.seconds, 2)}
            </Typography>
            <div></div>
            <Typography variant="body7" sx={{ mb: 1 }}>
              SECONDS
            </Typography>
          </Box>
        </Box>
      </CardWrapper>
    </>
  );
}
