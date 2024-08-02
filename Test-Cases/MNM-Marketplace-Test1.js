const { expect } = require("chai");

describe("Marketplace", function () {
  let nft, marketplace, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    await nft.deployed();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(nft.address);
    await marketplace.deployed();
  });

  it("should list and buy NFTs", async function () {
    await nft.createNFT("tokenURI1");
    await nft.createNFT("tokenURI2");

    await nft.approve(marketplace.address, 0);
    await marketplace.listNFT(0, ethers.utils.parseEther("1"));

    await marketplace.connect(addr1).buyNFT(0, { value: ethers.utils.parseEther("1") });

    expect(await nft.ownerOf(0)).to.equal(addr1.address);
  });
});
