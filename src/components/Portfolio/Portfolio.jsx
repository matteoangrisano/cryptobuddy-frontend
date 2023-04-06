import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./portfolio.scss";
import axios from "axios";

const Portfolio = () => {
  const [usdt, setUSDT] = useState();
  const [btc, setBTC] = useState();

  useEffect(() => {
    setTimeout(async () => {
      const fetchData = async () => {
        const usdt = await axios.get(`http://5.94.80.25:5000/usdt`);
        setUSDT(parseFloat(usdt.data));
        const btc = await axios.get(`http://5.94.80.25:5000/btc`);
        setBTC(parseFloat(btc.data));
      };
      fetchData();
    }, 1000);
  }, [usdt]);

  return (
    <Box className="portfolio">
      <Typography className="main-label" mt={2}>
        Portfolio
      </Typography>
      <Box>
        <Typography className="label" mt={2}>
          USDT
        </Typography>
        <Button className="USDT" variant="contained" color="secondary">
          ₮ {usdt ? usdt.toFixed(2) : null}
        </Button>
      </Box>
      <Box>
        <Typography className="label " mt={2}>
          BTC
        </Typography>
        <Button className="BTC" variant="contained" color="secondary">
          ฿ {btc ? btc.toFixed(2) : null}
        </Button>
      </Box>
    </Box>
  );
};

export default Portfolio;
