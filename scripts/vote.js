const { proposalsFile, developmentChains, VOTING_PERIOD } = require("../helper-hardhat-config")
const fs = require("fs")
const { network, ethers } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")


async function vote() {
    const governor = await ethers.getContract("GovernorContract")
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    // Get the last proposal for the network.
    const proposalId = proposals[network.config.chainId].at(-1)

    // Voting 0 = Against, 1 = For, 2 =  Abstain
    const voteWay = 1
    const reason = "Because that's how it should be"
    const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason)
    const voteTxReceipt = await voteTx.wait(1)
    console.log(`The reason of my vote: ${voteTxReceipt.events[0].args.reason}`)
    console.log("Voted! Boom, you are a good citizen!")

    let proposalState = await governor.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }

    proposalState = await governor.state(proposalId)
    console.log(`Current Proposal State: ${proposalState}`)
}

vote()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
