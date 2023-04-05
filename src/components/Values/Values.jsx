import { useEffect, useState } from "react";
import axios from "axios";
import "./values.scss";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const changePrice = async (e, price) => {
  e.preventDefault();
  await axios.post("http://3.249.164.104:5000/post", { value: price });
  console.log(e.target[0].value);
};

const Values = () => {
  const [crypto, setCrypto] = useState([]);
  const [mode, setMode] = useState();
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const fetchData = async () => {
        const res1 = await axios.get(`http://3.249.164.104:5000/get/btc`);
        setCrypto(res1.data);
        const res2 = await axios.get(`http://3.249.164.104:5000/mode`);
        setMode(res2.data);
        const res5 = await axios.get(`http://3.249.164.104:5000/orders`);
        setOrders(res5.data.reverse());
      };
      fetchData();
    }, 1000);
  }, [crypto]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="main">
      <Box className="commands">
        <Box className="setprice">
          <Typography className="label" mt={2}>
            setPrice
          </Typography>
          <TextField
            className="textfield"
            focused
            color="success"
            component="form"
            onSubmit={(e) => changePrice(e, e.target[0].value)}
          ></TextField>
        </Box>
        <Box>
          <Typography className="label" mt={2}>
            mode
          </Typography>
          <Button className="mode" variant="contained" color="secondary">
            {mode ? mode : null}
          </Button>
        </Box>
      </Box>
      <Box className="params">
        <Box className="left">
          <Typography className="label" mt={2}>
            lastPrice
          </Typography>
          <Button className="lastprice" variant="outlined">
            {crypto[0]?.lastPrice}
          </Button>
          <Typography className="label" mt={2}>
            highPrice
          </Typography>
          <Button className="highprice" variant="outlined">
            {crypto[0]?.highPrice}
          </Button>
        </Box>
        <Box className="right">
          <Typography className="label" mt={2}>
            triggerBuyPrice
          </Typography>
          <Button className="triggerbuyprice" variant="outlined">
            {crypto[0]?.triggerBuyPrice}
          </Button>
          <Typography className="label" mt={2}>
            triggerSellPrice
          </Typography>
          <Button className="triggersellprice" variant="outlined">
            {crypto[0]?.triggerSellPrice}
          </Button>
        </Box>
      </Box>
      <Box className="orders">
        {orders.map((order) => (
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
