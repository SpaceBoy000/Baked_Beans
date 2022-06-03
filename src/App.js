import Box from "@mui/material/Box";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Home />
      </Box>
    </BrowserRouter>
  );
}

export default App;
