// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {
    struct Listing {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool sold;
    }

    IERC721 public nftContract;
    uint256 public listingCounter;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed listingId, uint256 indexed tokenId, address seller, uint256 price);
    event Sold(uint256 indexed listingId, uint256 indexed tokenId, address buyer);

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        nftContract.transferFrom(msg.sender, address(this), tokenId);
        listings[listingCounter] = Listing(tokenId, payable(msg.sender), price, false);
        emit Listed(listingCounter, tokenId, msg.sender, price);
        listingCounter++;
    }

    function buyNFT(uint256 listingId) public payable {
        Listing storage listing = listings[listingId];
        require(msg.value == listing.price, "Incorrect price");
        require(!listing.sold, "NFT already sold");

        listing.sold = true;
        nftContract.transferFrom(address(this), msg.sender, listing.tokenId);
        listing.seller.transfer(msg.value);

        emit Sold(listingId, listing.tokenId, msg.sender);
    }
}

