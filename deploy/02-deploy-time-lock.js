const { network, ethers } = require("hardhat")
const { developmentChains, MIN_DELAY } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = [MIN_DELAY, [], [], deployer]

    const timelock = await deploy("TimeLock", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    console.log(`TimeLock deployed at ${timelock.address} !`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(timelock.address, args)
    }
    log("___________________________________")

}

module.exports.tags = ["all", "timelock"]
