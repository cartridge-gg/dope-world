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

export enum BridgeActions {
    ApproveEthereumBridge = "Approve Ethereum Bridge",
    WithdrawFromEthereumBridge = "Withdraw from Ethereum Bridge",
    BridgeToStarknet = "Bridge to Starknet",
    BridgeToEthereum = "Bridge to Ethereum",
}

export type Config = typeof config;

export type ValidChainId = keyof typeof config.bridge.l1.address;


