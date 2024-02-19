import { Address, formatEther } from "viem";
import config from "../config";
import { BridgeChains, ValidChainId } from "./types";


export const getEthereumBridgeAddress = (chainId: ValidChainId) => {
    return config.bridge.l1.address[chainId] as Address
}

export const getStarknetBridgeAddress = (chainId: ValidChainId) => {
    return config.bridge.sn.address[chainId] as Address
}

export const frenlyAddress = (address: string) => {
    return address.substring(0, 4) + "..." + address.substring(address.length - 4, address.length);
};

export const sanitizeAmount = (amount: string) => {
    return String(Number(amount) || 0)
}

export const addLeadingZeroEth = (address: string) => {
    const missing = 42 - address.length
    const toAdd = [...(new Array(missing))].map(() => "0").join("")
    return address.replace("0x", `0x${toAdd}`);
};

export const formatBalance = (balance: bigint) => {
    const etherBalance = Number(Number(Math.trunc(Number(formatEther(balance || 0n)) * 100) / 100).toFixed(2))
    return formatEtherBalance(etherBalance)
}

export const formatEtherBalance = (etherBalance: number) => {
    return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
        etherBalance,
    ).replace('US', '').replace('$', '').replaceAll(' ', '.')
}



export const getExplorerLink = (bridgeChain: BridgeChains, ethereumChainId: number, typ: string, value: string) => {
    let type = typ

    if (bridgeChain === BridgeChains.Starknet) {
        if (typ === "address") {
            type = "contract"
        }
    }

    return `${config.explorers[bridgeChain][ethereumChainId as ValidChainId]}${type}/${value}`
}



export function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target: any, source: any) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, { [key]: source[key] });
                else
                    output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}