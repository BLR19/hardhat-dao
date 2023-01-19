const networkConfig = {
    31337: {
        name: "localhost",
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    5: {
        name: "goerli",
        blockConfirmations: "6",
    },
}

const MIN_DELAY = 3600
const QUORUM_PERCENTAGE = 4 //4%
const VOTING_PERIOD = 5 //5 blocks
const VOTING_DELAY = 1 //1 block
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
const NEW_STORE_VALUE = 77
const FUNC = "store"
const PROPOSAL_DESCRIPTION = "Proposal #1 : Store '77' in the box"

const developmentChains = ["hardhat", "localhost"]
const proposalsFile = "proposals.json"

module.exports = {
    networkConfig,
    developmentChains,
    MIN_DELAY,
    QUORUM_PERCENTAGE,
    VOTING_PERIOD,
    VOTING_DELAY,
    ADDRESS_ZERO,
    NEW_STORE_VALUE,
    FUNC,
    PROPOSAL_DESCRIPTION,
    proposalsFile,
}
