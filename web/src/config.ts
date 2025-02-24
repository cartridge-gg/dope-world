
import { sepolia, localhost, mainnet } from "viem/chains"

import starknetPaperBridge from "./abis/StarknetPaperBridge.json"
import l1Token from "./abis/Token.json"

import paperBridge from "./abis/dope_world::paper_bridge::paper_bridge.json"
import paperToken from "./abis/dope_world::paper_token::paper_token.json"

import { BridgeChains } from "./common/types"
import { mergeDeep } from "./common/utils"

const enableTestnets = import.meta.env.VITE_ENABLE_TESTNETS === "true"


const explorers = {
    [BridgeChains.Ethereum]: {
        [localhost.id]: "https://local.etherscan.io/",
        [sepolia.id]: "https://sepolia.etherscan.io/",
        [mainnet.id]: "https://etherscan.io/",
    },
    [BridgeChains.Starknet]: {
        [localhost.id]: "https://local.voyager.online/",
        [sepolia.id]: "https://sepolia.voyager.online/",
        [mainnet.id]: "https://voyager.online/",
    }
}

const bridge = {
    l1: {
        abi: starknetPaperBridge.abi,
        tokenAbi: l1Token.abi,
        address: {
            [localhost.id]: "0xA2a4A401C8C1D6eD1ec03504018F4A1988635031",
            [sepolia.id]: "0xAcCC941E06A2bCa8e6A588Ef79Caa76E18188285",
            [mainnet.id]: "0x6B7d57E464E2121f2847aEAd1B26BF3409E9b599",
        }

    },
    sn: {
        abi: paperBridge.abi,
        tokenAbi: paperToken.abi,
        address: {
            [localhost.id]: "0x2ff2f9994ba7e039f50190cb3b3dc538d9abf7201acbe5a6a7aff686dd40d89",
            [sepolia.id]: "0x19bc231d0b20ea77e02cf286c93320df980bab5818bd13386c84998cb3e8c64",
            [mainnet.id]: "0x19bc231d0b20ea77e02cf286c93320df980bab5818bd13386c84998cb3e8c64",
        }
    }
}


const localhostOverride = mergeDeep(localhost, {
    rpcUrls: {
        public: {
            webSocket: ["ws://127.0.0.1:8545"]
        }
    }
})

const sepoliaOverride = mergeDeep(sepolia, {
    rpcUrls: {
        public: {
            webSocket: ["wss://ethereum-sepolia.publicnode.com", "wss://sepolia.gateway.tenderly.co"]
        }
    }
})

const mainnetOverride = mergeDeep(mainnet, {
    rpcUrls: {
        public: {
            http:["https://eth.llamarpc.com"],
            webSocket: ["wss://ethereum.publicnode.com", "wss://mainnet.gateway.tenderly.co"]
        }
    }
})


const chains = enableTestnets ? [localhostOverride, sepoliaOverride, mainnetOverride] : [mainnetOverride]

const config = {
    branding: {
        name: "PAPER BRIDGE",
        tokenName: "PAPER",
        logo: "/mark-dark.svg"
    },
    rainbowkit: {
        projectId: "aae981d5f608630b128805bc3961bf15"
    },
    //
    explorers,
    //
    bridge,
    chains,

}

export default config;