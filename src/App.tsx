import React, { useCallback, useEffect, useState } from "react";
import logo from "./assets/logoAASquare128.png";
import Box from "@mui/material/Box";
import "./App.css";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Copyright from "./components/Copyright";
import { unix_to_datetime } from "./utils/datetime";

const binance_socketUrl = "wss://stream.binance.com:9443/ws";

function App() {
  const [btcusdtTradeData, setBtcusdtTradeData] = useState<string | null>("");
  const [ethusdtTradeData, setEthusdtTradeData] = useState<string | null>("");
  const [adausdtTradeData, setAdausdtTradeData] = useState<string | null>("");
  const [ltcusdtTradeData, setLtcusdtTradeData] = useState<string | null>("");
  const [dataFromDT2, setDataFromDT2] = useState<string | null>("");
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(binance_socketUrl);

  /////////////////////////////////////////////////////////////////////////////
  // Binance Websocket service
  /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log(lastJsonMessage);
    if (lastJsonMessage) {
      if ("e" in lastJsonMessage) {
        const updateType: string = lastJsonMessage["e"];
        if (updateType === "trade") {
          // {
          //   "e": "trade",     // Event type
          //   "E": 123456789,   // Event time
          //   "s": "BNBBTC",    // Symbol
          //   "t": 12345,       // Trade ID
          //   "p": "0.001",     // Price
          //   "q": "100",       // Quantity
          //   "b": 88,          // Buyer order ID
          //   "a": 50,          // Seller order ID
          //   "T": 123456785,   // Trade time
          //   "m": true,        // Is the buyer the market maker?
          //   "M": true         // Ignore
          // }
          const print_msg = `[${unix_to_datetime(lastJsonMessage["T"])}] Ticker: ${lastJsonMessage["s"]} @ ${parseFloat(lastJsonMessage["p"]).toFixed(
            3
          )}, Qty: ${lastJsonMessage["q"]} (is Buyer Marker Maker? ${lastJsonMessage["m"]})`;
          switch (lastJsonMessage["s"]) {
            case "BTCUSDT":
              setBtcusdtTradeData(print_msg);
              break;
            case "ETHUSDT":
              setEthusdtTradeData(print_msg);
              break;
            case "ADAUSDT":
              setAdausdtTradeData(print_msg);
              break;
            case "LTCUSDT":
              setLtcusdtTradeData(print_msg);
              break;
          }
        } else if (updateType == "kline") {
          // {
          //   "e": "kline",     // Event type
          //   "E": 123456789,   // Event time
          //   "s": "BNBBTC",    // Symbol
          //   "k": {
          //     "t": 123400000, // Kline start time
          //     "T": 123460000, // Kline close time
          //     "s": "BNBBTC",  // Symbol
          //     "i": "1m",      // Interval
          //     "f": 100,       // First trade ID
          //     "L": 200,       // Last trade ID
          //     "o": "0.0010",  // Open price
          //     "c": "0.0020",  // Close price
          //     "h": "0.0025",  // High price
          //     "l": "0.0015",  // Low price
          //     "v": "1000",    // Base asset volume
          //     "n": 100,       // Number of trades
          //     "x": false,     // Is this kline closed?
          //     "q": "1.0000",  // Quote asset volume
          //     "V": "500",     // Taker buy base asset volume
          //     "Q": "0.500",   // Taker buy quote asset volume
          //     "B": "123456"   // Ignore
          //   }
          // }
          const kObj = lastJsonMessage["k"];
          const print_msg = `[${unix_to_datetime(kObj["T"])}] Ticker: ${kObj["s"]} @ ${kObj["i"]}, O: ${parseFloat(kObj["o"]).toFixed(3)}, H: ${parseFloat(
            kObj["h"]
          ).toFixed(3)}, L: ${parseFloat(kObj["l"]).toFixed(3)}, C: ${parseFloat(kObj["c"]).toFixed(3)}. num trades: ${kObj["n"]}, base asset vol: ${
            kObj["v"]
          }`;

          setDataFromDT2(print_msg);
        }
      }
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    handleSubscribeData("btcusdt", "trade");
    handleSubscribeData("ethusdt", "trade");
    handleSubscribeData("adausdt", "trade");
    handleSubscribeData("ltcusdt", "trade");
  }, []);

  // this is how you start and stop feeds from binance API
  const handleSubscribeData = useCallback(
    (pair: string, datatype: string) => {
      sendJsonMessage({
        method: "SUBSCRIBE",
        params: [`${pair}@${datatype}`],
        id: 1,
      });
    },
    [sendJsonMessage]
  );

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
          <img src={logo} className="App-logo" alt="Aurelius Ai Logo" />
          <h1>Aurelius Ai</h1>
        </Box>
        <Box sx={{ mt: 1 }} id="slogan">
          Innovation in Web3 and AI
        </Box>
      </header>
      <Box px={2}>
        <Box>{btcusdtTradeData}</Box>
        <Box>{ethusdtTradeData}</Box>
        <Box>{adausdtTradeData}</Box>
        <Box>{ltcusdtTradeData}</Box>
      </Box>
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
