import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import axios from "axios";

class App extends Component {
  state = {
    price: "",
    onebnb: "",
    argonbalance: "",
    bnbbalance: ""
  }
  async componentDidMount() {
    var socket = new WebSocket("wss://stream.binance.com:9443/ws/bnbbusd@trade");
    let argonbalance;
    let bnbbalance;
    setInterval(() => {
    axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT").then((data) => {
      const bnbprice = Number(data.data.price).toFixed(2);
       axios.get("https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x851f7a700c5d67db59612b871338a85526752c25&address=0x793FE5a628a79Ae3E619ACbCde1CBaf8053beFc5&tag=latest&apikey=YourApiKeyToken").then((data) => {
       if(data.data.status == 1) { 
       argonbalance = data.data.result;
      }
      });
       axios.get("https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&address=0x793FE5a628a79Ae3E619ACbCde1CBaf8053beFc5&tag=latest&apikey=YourApiKeyToken").then((data) => {
        if(data.data.status == 1) { 
       
       bnbbalance = data.data.result;
        }
      });
      const argonprice_usd = (bnbbalance / argonbalance * bnbprice).toFixed(4);
      const onebnb = (argonbalance / bnbbalance).toFixed(2);
      const _argonbalance = (argonbalance / 1000000000000000000).toFixed(2);
      const _bnbbalance = (bnbbalance / 1000000000000000000).toFixed(2);
      this.setState({
        price: argonprice_usd,
        onebnb: onebnb,
        argonbalance: _argonbalance,
        bnbbalance: _bnbbalance
      })
  })
}, 1000)

  }
  render() {
    const {price, onebnb, argonbalance, bnbbalance} = this.state;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        1 ARGON = {price} $
        </p>
        <hr/>
        <p>
        1 BNB = {onebnb} ARGON
        </p>
        <hr/>
        <p>
        ARGON BALANCE = {argonbalance} 
        <br/>
        BNB BALANCE = {bnbbalance}  
        </p>
      </header>
    </div>
  );
}
}

export default App;
