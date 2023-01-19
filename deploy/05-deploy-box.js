const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = []

    const box = await deploy("Box", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    console.log(`Box contract deployed at ${box.address} !`)
    const timelock = await ethers.getContract("TimeLock")

    const boxContract = await ethers.getContractAt("Box", box.address)
    const transferOwnerTx = await boxContract.transferOwnership(timelock.address)
    await transferOwnerTx.wait(1)

    console.log(`Ownership of the Box contract transfered to: ${timelock.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(box.address, args)
    }
    log("___________________________________")
}

module.exports.tags = ["all", "box"]
