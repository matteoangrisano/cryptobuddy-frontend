import Chart from "./components/Chart/Chart";
import Values from "./components/Values/Values";
import Portfolio from "./components/Portfolio/Portfolio";

import "./app.scss";
import { Box } from "@mui/material";

function App() {
  return (
    <Box className="app">
      <Box className="chart">
        <Chart></Chart>
        <Portfolio></Portfolio>
      </Box>
      <Box className="values">
        <Values></Values>
      </Box>
    </Box>
  );
}

export default App;
