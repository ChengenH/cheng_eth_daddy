import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
const Domain = ({
  domain,
  ethDaddy,
  provider,
  id
}) => {
  const [owner, setOwner] = useState(null);
  const [hasSold, setHasSold] = useState(false);
  const getOwner = async () => {
    if (domain.isOwned || hasSold) {
      const owner = await ethDaddy.ownerOf(id);
      setOwner(owner);
    }
  };
  const buyHandler = async () => {
    const signer = await provider.getSigner();
    const transaction = await ethDaddy.connect(signer).mint(id, {
      value: domain.cost
    });
    await transaction.wait();
    setHasSold(true);
  };
  useEffect(() => {
    getOwner();
  }, [hasSold]);
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card__info"
  }, /*#__PURE__*/React.createElement("h3", null, domain.isOwned || owner ? /*#__PURE__*/React.createElement("del", null, domain.name) : /*#__PURE__*/React.createElement(React.Fragment, null, domain.name)), /*#__PURE__*/React.createElement("p", null, domain.isOwned || owner ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("small", null, "Owned by:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, owner && owner.slice(0, 6) + '...' + owner.slice(38, 42)))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("strong", null, ethers.utils.formatUnits(domain.cost.toString(), 'ether')), "ETH"))), !domain.isOwned && !owner && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "card__button",
    onClick: () => buyHandler()
  }, "Buy It"));
};
export default Domain;