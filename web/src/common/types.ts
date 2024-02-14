import config from "../config";

export enum BridgeDirection {
    FromEthereumToStarknet,
    FromStarknetToEthereum,
}

export enum BridgeSide {
    From = "FROM",
    To = "TO",
}

export enum BridgeChains {
    Ethereum = "Ethereum",
    Starknet = "Starknet",
}



export type Config = typeof config;

export type ValidChainId = keyof typeof config.bridge.l1.address;


