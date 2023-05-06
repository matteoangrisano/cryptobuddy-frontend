import { useEffect, useState } from "react";
import axios from "axios";
import "./values.scss";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Values = () => {
  const [crypto, setCrypto] = useState([]);
  const [mode, setMode] = useState();
  const [orders1, setOrders1] = useState([]);
  const [orders2, setOrders2] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const fetchData = async () => {
        const res1 = await axios.get(`http://34.245.66.188:5000/get/btc`);
        setCrypto(res1.data);
        const res2 = await axios.get(`http://34.245.66.188:5000/mode`);
        setMode(res2.data);
        const res5 = await axios.get(`http://34.245.66.188:5000/orders1`);
        setOrders1(res5.data.reverse());
        const res6 = await axios.get(`http://34.245.66.188:5000/orders2`);
        setOrders2(res6.data.reverse());
      };
      fetchData();
    }, 1000);
  }, [crypto]);

  return (
    <Box className="main">
      <Box className="commands">
        <Box>
          <Typography className="label" mt={2}>
            mode
          </Typography>
          <Button className="mode" variant="contained" color="secondary">
            {mode ? mode : null}
          </Button>
        </Box>
      </Box>
      <Box className="values">
        <Box>
          <Typography className="label" mt={2}>
            lastPrice
          </Typography>
          <Button className="lastprice" variant="outlined">
            {crypto[0]?.lastPrice}
          </Button>
        </Box>
        <Box>
          <Typography className="label" mt={2}>
            highPrice
          </Typography>
          <Button className="highprice" variant="outlined">
            {crypto[0]?.highPrice}
          </Button>
        </Box>
        <Box>
          <Typography className="label" mt={2}>
            triggerBuyPrice
          </Typography>
          <Button className="triggerbuyprice" variant="outlined">
            {crypto[0]?.triggerBuyPrice}
          </Button>
        </Box>
        <Box>
          <Typography className="label" mt={2}>
            triggerSellPrice
          </Typography>
          <Button className="triggersellprice" variant="outlined">
            {crypto[0]?.triggerSellPrice}
          </Button>
        </Box>
      </Box>
      <Box className="orders">
        <Typography className="label" mt={2}>
          Ordini M
        </Typography>
        {orders1.map((order) => (
          <Box className="order">
            <Typography className="time" mt={2}>
              {new Date(order.time).toLocaleString().slice(0, 8)}
            </Typography>
            <Typography className="time">
              {new Date(order.time).toLocaleString().slice(10)}
            </Typography>
            <Typography
              className={order.side === "BUY" ? "side-buy" : "side-sell"}
              mt={2}
            >
              {order.side}
            </Typography>
            <Typography className="price" mt={2}>
              {order.price}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box className="orders">
        <Typography className="label" mt={2}>
          Ordini S
        </Typography>
        {orders2.map((order) => (
          <Box className="order">
            <Typography className="time" mt={2}>
              {new Date(order.time).toLocaleString().slice(0, 8)}
            </Typography>
            <Typography className="time">
              {new Date(order.time).toLocaleString().slice(10)}
            </Typography>
            <Typography
              className={order.side === "BUY" ? "side-buy" : "side-sell"}
              mt={2}
            >
              {order.side}
            </Typography>
            <Typography className="price" mt={2}>
              {order.price}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Values;
