const NFT = artifacts.require("NFT");
const Marketplace = artifacts.require("Marketplace");
const Royalties = artifacts.require("Royalties");

module.exports = function (deployer) {
  deployer.deploy(NFT).then(function () {
    return deployer.deploy(Marketplace, NFT.address);
  });
  deployer.deploy(Royalties);
};

