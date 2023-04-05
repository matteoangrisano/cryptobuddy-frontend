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
        const usdt = await axios.get(`http://3.249.164.104:5000/usdt`);
        setUSDT(usdt.data);
        const btc = await axios.get(`http://3.249.164.104:5000/btc`);
        setBTC(btc.data);
      };
      fetchData();
    }, 1000);
  }, [usdt]);

  return (
    <Box className="portfolio">
      <Typography className="label" mt={2}>
        Portfolio
      </Typography>
      <Box>
        <Typography className="label" mt={2}>
          USDT
        </Typography>
        <Button className="USDT" variant="contained" color="secondary">
          {usdt ? usdt : null}
        </Button>
      </Box>
      <Box>
        <Typography className="label " mt={2}>
          BTC
        </Typography>
        <Button className="BTC" variant="contained" color="secondary">
          {btc ? btc : null}
        </Button>
      </Box>
    </Box>
  );
};

export default Portfolio;
