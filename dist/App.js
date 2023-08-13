import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Domain from './components/Domain';

// ABIs
import ETHDaddy from './abis/ETHDaddy.json';

// Config
import config from './config.json';
function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [ethDaddy, setETHDaddy] = useState(null);
  const [domains, setDomains] = useState([]);
  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    console.log(network);
    const ethDaddy = new ethers.Contract(config[network.chainId].ETHDaddy.address, ETHDaddy, provider);
    setETHDaddy(ethDaddy);
    console.log(ethDaddy);
    const maxSupply = await ethDaddy.maxSupply();
    const domains = [];
    for (var i = 1; i <= maxSupply; i++) {
      const domain = await ethDaddy.getDomain(i);
      domains.push(domain);
    }
    setDomains(domains);
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Navigation, {
    account: account,
    setAccount: setAccount
  }), /*#__PURE__*/React.createElement(Search, null), /*#__PURE__*/React.createElement("div", {
    className: "cards__section"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "cards__title"
  }, "Why you need a domain name."), /*#__PURE__*/React.createElement("p", {
    className: "cards__description"
  }, "Own your custom username, use it across services, and be able to store an avatar and other profile data."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    className: "cards"
  }, domains.map((domain, index) => /*#__PURE__*/React.createElement(Domain, {
    domain: domain,
    ethDaddy: ethDaddy,
    provider: provider,
    id: index + 1,
    key: index
  })))));
}
export default App;