const { expect } = require("chai");
const { ethers } = require("hardhat");

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

  it("should mint an NFT", async function () {
    await nft.createNFT("tokenURI1");
    expect(await nft.ownerOf(0)).to.equal(owner.address);
  });

  it("should list an NFT", async function () {
    await nft.createNFT("tokenURI1");
    await nft.approve(marketplace.address, 0);
    await marketplace.listNFT(0, ethers.utils.parseEther("1"));

    const listing = await marketplace.listings(0);
    expect(listing.tokenId).to.equal(0);
    expect(listing.seller).to.equal(owner.address);
    expect(listing.price).to.equal(ethers.utils.parseEther("1"));
    expect(listing.sold).to.equal(false);
  });

  it("should buy an NFT", async function () {
    await nft.createNFT("tokenURI1");
    await nft.approve(marketplace.address, 0);
    await marketplace.listNFT(0, ethers.utils.parseEther("1"));

    await marketplace.connect(addr1).buyNFT(0, { value: ethers.utils.parseEther("1") });

    expect(await nft.ownerOf(0)).to.equal(addr1.address);

    const listing = await marketplace.listings(0);
    expect(listing.sold).to.equal(true);
  });

  it("should revert if price is incorrect", async function () {
    await nft.createNFT("tokenURI1");
    await nft.approve(marketplace.address, 0);
    await marketplace.listNFT(0, ethers.utils.parseEther("1"));

    await expect(
      marketplace.connect(addr1).buyNFT(0, { value: ethers.utils.parseEther("0.5") })
    ).to.be.revertedWith("Incorrect price");
  });

  it("should revert if NFT is already sold", async function () {
    await nft.createNFT("tokenURI1");
    await nft.approve(marketplace.address, 0);
    await marketplace.listNFT(0, ethers.utils.parseEther("1"));

    await marketplace.connect(addr1).buyNFT(0, { value: ethers.utils.parseEther("1") });

    await expect(
      marketplace.connect(addr2).buyNFT(0, { value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("NFT already sold");
  });
});
