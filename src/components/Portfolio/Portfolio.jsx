import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./portfolio.scss";
import axios from "axios";

const Portfolio = () => {
  const [usdt1, setUSDT1] = useState();
  const [btc1, setBTC1] = useState();
  const [usdt2, setUSDT2] = useState();
  const [btc2, setBTC2] = useState();

  useEffect(() => {
    setTimeout(async () => {
      const fetchData = async () => {
        const usdt1 = await axios.get(`http://34.245.66.188:5000/usdt1`);
        setUSDT1(usdt1.data);
        const btc1 = await axios.get(`http://34.245.66.188:5000/btc1`);
        setBTC1(btc1.data);
        const usdt2 = await axios.get(`http://34.245.66.188:5000/usdt2`);
        setUSDT2(usdt2.data);
        const btc2 = await axios.get(`http://34.245.66.188:5000/btc2`);
        setBTC2(btc2.data);
      };
      fetchData();
    }, 1000);
  }, [usdt1]);

  return (
    <Box className="portfolio">
      <Typography className="label" mt={2}>
        Portfolio M
      </Typography>
      <Box>
        <Typography className="label" mt={2}>
          USDT
        </Typography>
        <Button className="USDT" variant="contained" color="secondary">
          ₮ {usdt1 ? usdt1 : null}
        </Button>
      </Box>
      <Box>
        <Typography className="label " mt={2}>
          BTC
        </Typography>
        <Button className="BTC" variant="contained" color="secondary">
          ฿ {btc1 ? btc1 : null}
        </Button>
      </Box>
      <Typography className="label" mt={2}>
        Portfolio S
      </Typography>
      <Box>
        <Typography className="label" mt={2}>
          USDT
        </Typography>
        <Button className="USDT" variant="contained" color="secondary">
          ₮ {usdt2 ? usdt2 : null}
        </Button>
      </Box>
      <Box>
        <Typography className="label " mt={2}>
          BTC
        </Typography>
        <Button className="BTC" variant="contained" color="secondary">
          ฿ {btc2 ? btc2 : null}
        </Button>
      </Box>
    </Box>
  );
};

export default Portfolio;
