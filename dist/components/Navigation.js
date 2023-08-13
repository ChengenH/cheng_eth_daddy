import { ethers } from 'ethers';
import logo from '../assets/logo.svg';
const Navigation = ({
  account,
  setAccount
}) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: "nav__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Logo"
  }), /*#__PURE__*/React.createElement("h1", null, "ETH Daddy"), /*#__PURE__*/React.createElement("ul", {
    className: "nav__links"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, "Domain Names")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, "Websites & Hosting")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, "Commerce")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, "Email & Marketing")))), account ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nav__connect"
  }, account.slice(0, 6) + '...' + account.slice(38, 42)) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "nav__connect",
    onClick: connectHandler
  }, "Connect"));
};
export default Navigation;