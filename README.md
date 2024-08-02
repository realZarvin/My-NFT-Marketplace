# My Try at a NFT Marketplace

## Overview

This project demonstrates an advanced NFT marketplace using Solidity smart contracts. The marketplace allows users to mint, list, buy, sell, and auction NFTs, with built-in royalty mechanisms for creators. It leverages the ERC-721 standard for non-fungible tokens, providing a comprehensive platform for managing unique digital assets.

## Features

- **Minting and Listing NFTs**: Users can create and list their NFTs for sale on the marketplace.
- **Buying, Selling, and Auctioning NFTs**: Facilitates the buying, selling, and auctioning of NFTs.
- **Royalties for Creators**: Ensures creators receive royalties on secondary sales.
- **Search and Filter Functionality**: Provides functionalities to search and filter listed NFTs.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Hardhat](https://hardhat.org/)
- [Docker](https://www.docker.com/get-started) (Optional for Ganache CLI)

## Setup

### Install Dependencies

To install the necessary dependencies, run:

```bash
npm install
```

### Compile Contracts

Compile the smart contracts using Hardhat:

```bash
npx hardhat compile
```

### Deploy Contracts

#### Using Truffle

1. **Start a local blockchain**:

    ```bash
    npx ganache-cli
    ```

2. **Deploy the contracts**:

    ```bash
    npx truffle migrate --network development
    ```

#### Using Hardhat

1. **Deploy the contracts**:

    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

### Run Tests

Run the tests to ensure everything is working correctly:

```bash
npx hardhat test
```

## Contracts

### NFT.sol

The `NFT.sol` contract implements the ERC-721 standard for minting non-fungible tokens.

### Marketplace.sol

The `Marketplace.sol` contract handles listing, buying, and selling of NFTs. It interacts with the `NFT` contract to facilitate transactions.

### Royalties.sol

The `Royalties.sol` contract manages royalties for creators, ensuring they receive a percentage of sales when their NFTs are resold.

## Usage

1. **Mint an NFT**:
    - Call the `createNFT` function in the `NFT` contract to mint a new NFT.

2. **List an NFT**:
    - Approve the `Marketplace` contract to transfer your NFT.
    - Call the `listNFT` function in the `Marketplace` contract with the token ID and price.

3. **Buy an NFT**:
    - Call the `buyNFT` function in the `Marketplace` contract with the listing ID and send the required ETH.

## Repository Structure

```plaintext
nft-marketplace/
├── contracts/
│   ├── NFT.sol
│   ├── Marketplace.sol
│   └── Royalties.sol
├── migrations/
│   └── 2_deploy_contracts.js
├── test/
│   ├── Marketplace.test.js
│   ├── NFT.test.js
│   └── Royalties.test.js
├── scripts/
│   └── deploy.js
├── truffle-config.js
├── hardhat.config.js
├── package.json
└── README.md
```

## Test Cases

### Marketplace Test Cases

**Marketplace.test.js**

- **should mint an NFT**: Tests minting functionality.
- **should list an NFT**: Tests listing functionality.
- **should buy an NFT**: Tests buying functionality.
- **should revert if price is incorrect**: Tests error handling for incorrect price.
- **should revert if NFT is already sold**: Tests error handling for already sold NFT.

### Royalties Test Cases

**Royalties.test.js**

- **should mint an NFT with royalties**: Tests minting with royalty information.
- **should set royalties for an existing NFT**: Tests setting royalties.
- **should revert if setting royalties for non-existing NFT**: Tests error handling for non-existing NFT.

### NFT Test Cases

**NFT.test.js**

- **should mint an NFT**: Tests basic minting.
- **should return correct token URI**: Tests token URI functionality.
- **should transfer an NFT**: Tests NFT transfer.
- **should revert if non-owner tries to transfer**: Tests error handling for unauthorized transfer.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

This README provides a comprehensive guide to setting up, deploying, and testing your NFT Marketplace project, ensuring that other developers can easily understand and contribute to the project.
