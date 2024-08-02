const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
  let nft, owner, addr1;

  beforeEach(async function () {
    [owner, addr1, ...addrs] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("NFT");
    nft = await NFT.deploy();
    await nft.deployed();
  });

  it("should mint an NFT", async function () {
    await nft.createNFT("tokenURI1");
    expect(await nft.ownerOf(0)).to.equal(owner.address);
  });

  it("should return correct token URI", async function () {
    await nft.createNFT("tokenURI1");
    expect(await nft.tokenURI(0)).to.equal("tokenURI1");
  });

  it("should transfer an NFT", async function () {
    await nft.createNFT("tokenURI1");
    await nft.transferFrom(owner.address, addr1.address, 0);
    expect(await nft.ownerOf(0)).to.equal(addr1.address);
  });

  it("should revert if non-owner tries to transfer", async function () {
    await nft.createNFT("tokenURI1");
    await expect(
      nft.connect(addr1).transferFrom(owner.address, addr1.address, 0)
    ).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
  });
});
