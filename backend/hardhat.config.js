require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
            details: { yul: false },
          },
        },
      },
    defaultNetwork: "tomo-testnet",
    networks: {
        // for mainnet
        'tomo-mainnet': {
          url: 'https://rpc.viction.xyz',
          accounts: [process.env.PRIVATE_KEY],
        },
        // for testnet
        'tomo-testnet': {
          url: 'https://rpc-testnet.viction.xyz',
          accounts: [process.env.PRIVATE_KEY],
        },
      },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}
