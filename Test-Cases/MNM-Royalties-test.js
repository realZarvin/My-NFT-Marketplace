const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Royalties", function () {
  let royalties, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const Royalties = await ethers.getContractFactory("Royalties");
    royalties = await Royalties.deploy();
    await royalties.deployed();
  });

  it("should mint an NFT with royalties", async function () {
    await royalties.mint("tokenURI1", addr1.address, 500); // 5% royalty
    expect(await royalties.ownerOf(0)).to.equal(owner.address);

    const royaltyInfo = await royalties.getRoyaltyInfo(0);
    expect(royaltyInfo[0]).to.equal(addr1.address);
    expect(royaltyInfo[1]).to.equal(500);
  });

  it("should set royalties for an existing NFT", async function () {
    await royalties.mint("tokenURI1", addr1.address, 500); // 5% royalty
    await royalties.setRoyalty(0, addr2.address, 300); // Change to 3% royalty

    const royaltyInfo = await royalties.getRoyaltyInfo(0);
    expect(royaltyInfo[0]).to.equal(addr2.address);
    expect(royaltyInfo[1]).to.equal(300);
  });

  it("should revert if setting royalties for non-existing NFT", async function () {
    await expect(
      royalties.setRoyalty(999, addr1.address, 500)
    ).to.be.revertedWith("Token does not exist");
  });
});
