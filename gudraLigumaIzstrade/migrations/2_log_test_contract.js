let LogStorage = artifacts.require("./LogTestContract.sol");

module.exports = function (deployer) {
  deployer.deploy(LogStorage);
};