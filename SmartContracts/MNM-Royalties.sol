// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Royalties is ERC721URIStorage, Ownable {
    struct RoyaltyInfo {
        address recipient;
        uint256 percentage;
    }

    mapping(uint256 => RoyaltyInfo) public royalties;

    constructor() ERC721("RoyaltyNFT", "RFT") {}

    function setRoyalty(uint256 tokenId, address recipient, uint256 percentage) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        royalties[tokenId] = RoyaltyInfo(recipient, percentage);
    }

    function getRoyaltyInfo(uint256 tokenId) public view returns (address, uint256) {
        RoyaltyInfo memory info = royalties[tokenId];
        return (info.recipient, info.percentage);
    }

    function mint(string memory tokenURI, address recipient, uint256 percentage) public onlyOwner {
        uint256 tokenId = totalSupply();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        setRoyalty(tokenId, recipient, percentage);
    }
}
