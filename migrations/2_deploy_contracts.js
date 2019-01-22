var BountyMarket = artifacts.require("./BountyMarket.sol");

module.exports = function(deployer) {
  deployer.deploy(BountyMarket);
};
