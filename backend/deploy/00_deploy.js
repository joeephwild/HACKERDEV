require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments
    console.log("Wallet Ethereum Address:", wallet.address)
    // const chainId = network.config.chainId
    // const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"]

    //deploy Simplecoin
    const filMediaArtistNFT = await deploy("FilMediaArtistNFT", {
        from: wallet.address,
        args: [],
        log: true,
    })
    console.log("FilMediaArtistNFT deployed to:", filMediaArtistNFT.address)

    //deploy FilMediaMarketplace
    const filMediaMarketplace = await deploy("FilMediaMarketplace", {
        from: wallet.address,
        args: [],
        log: true,
    })
    console.log("FilMediaMarketplace deployed to:", filMediaMarketplace.address)

    //deploy FilMediaDynamicNFT
    const filMediaDynamicNFT = await deploy("FilMediaDynamicNFT", {
        from: wallet.address,
        args: [filMediaMarketplace.address],
        log: true,
    })
    console.log("FilMediaDynamicNFT deployed to:", filMediaDynamicNFT.address)

    //deploy FilMediaNFT
    const filMediaNFT = await deploy("FilMediaNFT", {
        from: wallet.address,
        args: [],
        log: true,
    })
    console.log("FilMediaNFT deployed to:", filMediaNFT.address)

    //deploy FilMediaNFT
    const FilMediaSubscriptionContract = await deploy("FilMediaSubscriptionContract", {
        from: wallet.address,
        args: [],
        log: true,
    })
    console.log("FilMediaNFT deployed to:", FilMediaSubscriptionContract.address)
}
