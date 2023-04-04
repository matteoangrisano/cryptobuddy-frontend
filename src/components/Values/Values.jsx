import { useEffect, useState } from "react";
import axios from "axios";
import "./values.scss";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const changePrice = async (e, price) => {
  e.preventDefault();
  await axios.post("http://3.249.164.104:5000/post", { value: price });
  console.log(e.target[0].value);
};

const Values = () => {
  const [crypto, setCrypto] = useState([]);
  const [mode, setMode] = useState();
  const [usdt, setUSDT] = useState();
  const [btc, setBTC] = useState();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const fetchData = async () => {
        const res1 = await axios.get(`http://3.249.164.104:5000/get/btc`);
        setCrypto(res1.data);
        const res2 = await axios.get(`http://3.249.164.104:5000/mode`);
        setMode(res2.data);
        const res3 = await axios.get(`http://3.249.164.104:5000/usdt`);
        setUSDT(res3.data);
        const res4 = await axios.get(`http://3.249.164.104:5000/btc`);
        setBTC(res4.data);
        const res5 = await axios.get(`http://3.249.164.104:5000/orders`);
        setOrders(res5.data);
        console.log(orders);
      };
      fetchData();
    }, 1000);
  }, [crypto]);

  return (
    <Box className="main">
      <Box className="left">
        <div>
          <Typography className="label" mt={2}>
            setPrice
          </Typography>
          <TextField
            label="lastPrice"
            focused
            color="success"
            component="form"
            onSubmit={(e) => changePrice(e, e.target[0].value)}
          ></TextField>
        </div>

        <div>
          <Typography className="label" mt={2}>
            mode
          </Typography>
          <Button variant="contained" color="secondary">
            {mode ? mode : null}
          </Button>
        </div>
      </Box>
      <Box className="center">
        <div>
          <Typography className="label" mt={2}>
            lastPrice
          </Typography>
          <Button variant="contained" color="success">
            {crypto[0]?.lastPrice}
          </Button>
        </div>
        <div>
          <Typography className="label" mt={2}>
            highPrice
          </Typography>
          <Button variant="outlined">{crypto[0]?.highPrice}</Button>
        </div>
        <div>
          <Typography className="label" mt={2}>
            triggerBuyPrice
          </Typography>
          <Button variant="outlined">{crypto[0]?.triggerBuyPrice}</Button>
        </div>
        <div>
          <Typography className="label" mt={2}>
            triggerSellPrice
          </Typography>
          <Button variant="outlined">{crypto[0]?.triggerSellPrice}</Button>
        </div>
      </Box>
      <Box className="right">
        <div>
          <Typography className="label" mt={2}>
            USDT
          </Typography>
          <Button className="USDT" variant="contained" color="secondary">
            {usdt ? usdt : null}
          </Button>
        </div>
        <div>
          <Typography className="label " mt={2}>
            BTC
          </Typography>
          <Button className="BTC" variant="contained" color="secondary">
            {btc ? btc : null}
          </Button>
        </div>
      </Box>
      <Box className="orders">
        <div>
          {orders.map((order) => (
            <>
              <Typography className="symbol" mt={2}>
                {order.symbol}
              </Typography>
              <Typography className="type" mt={2}>
                {order.side}{" "}
              </Typography>
              <Typography className="date" mt={2}>
                {new Date(order.time).toLocaleString()}{" "}
              </Typography>
            </>
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default Values;
