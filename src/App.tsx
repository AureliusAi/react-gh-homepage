import React from "react";
import logo from "./assets/aurelius_ai_128_lightning_icon.png";
import Box from "@mui/material/Box";
import "./App.css";
import Copyright from "./components/Copyright";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            mb: 0,
            pb: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box mr={2}>
            <img src={logo} className="App-logo" alt="Aurelius Ai Logo" />
          </Box>
          <h1>Aurelius Ai</h1>
        </Box>
        <Box sx={{ mt: 1 }} id="slogan">
          Innovation in Web3 and AI
        </Box>
      </header>
      <Box px={2}>
        <h2>Freelance Full-Stack DAPP/Web3 Developer located in Tokyo</h2>
        <p>Services include</p>
        <ul>
          <li>Javascript/Typescripot/Front End</li>
          <li>Solidity/Smart Contracts</li>
          <li>Etherium/Cardano</li>
          <li>NFT</li>
          <li>DAO</li>
          <li>ML/AI model developement in python for API backend</li>
        </ul>
        <Box>
          contact: <a href="mailto:markus.aurelius.ai@gmail.com">email contact</a>
        </Box>
        <Box>
          github: <a href="https://github.com/AureliusAi">https://github.com/AureliusAi</a>
        </Box>
        <Box>
          twitter: <a href="https://twitter.com/AiAurelius">@AiAurelius</a>
        </Box>
      </Box>
      <Copyright sx={{ pt: 4 }} />
    </div>
  );
}

export default App;
