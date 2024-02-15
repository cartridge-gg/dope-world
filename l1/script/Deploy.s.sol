// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "@create3-factory/CREATE3Factory.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "../src/StarknetMessagingLocal.sol";
import "../src/Token.sol";
import "../src/StarknetPaperBridge.sol";
import "./BaseScript.sol";

bytes32 constant CREATE3_SALT = keccak256(bytes("CREATE3Salt"));

bytes32 constant SN_SALT = keccak256(bytes("SNSalt"));
bytes32 constant TOKEN_SALT = keccak256(bytes("Token"));
bytes32 constant BRIDGE_SALT = keccak256(bytes("StarknetPaperBridge"));

/**
   Deploys the ContractMsg and StarknetMessagingLocal contracts.
   Very handy to quickly setup Anvil to debug.
*/
contract Deploy is BaseScript {
    function setUp() public {}

    function run() public {
        string memory json = "";

        vm.startBroadcast(this.getEnv().ACCOUNT_PRIVATE_KEY);

        address starknetAddress;
        if (this.isLocal()) {
            starknetAddress = address(new StarknetMessagingLocal());
        } else {
            starknetAddress = this.getEnv().STARKNET_ADDRESS;
        }
        vm.serializeString(
            json,
            "StarknetAddress",
            vm.toString(starknetAddress)
        );

        address tokenAddress;

        if (this.isLocal() /*|| this.isGoerli()*/) {
            tokenAddress = address(new Token());
        } else {
            tokenAddress = this.getEnv().TOKEN_ADDRESS;
        }
        vm.serializeString(json, "Token", vm.toString(tokenAddress));

        address implAddress = address(new StarknetPaperBridge(this.getEnv().ACCOUNT_ADDRESS));

        bytes memory dataInit = abi.encodeWithSelector(
            StarknetPaperBridge.initialize.selector,
            abi.encode(
                this.getEnv().ACCOUNT_ADDRESS,
                starknetAddress,
                tokenAddress,
                this.getEnv().L2_BRIDGE_ADDRESS
            )
        );

        // If proxy is at address 0, a new proxy is deployed with
        // initial implementation.
        // Otherwise, only the impl is deployed and updated in the proxy.
        address proxyAddress = this.getEnv().PROXY_ADDRESS;
        if (proxyAddress == address(0x0)) {
            proxyAddress = address(new ERC1967Proxy(implAddress, dataInit));
        } else {
            StarknetPaperBridge(payable(proxyAddress)).upgradeToAndCall(implAddress, dataInit);
        }

        vm.serializeString(json, "StarknetPaperBridge_proxy", vm.toString(proxyAddress));
        vm.serializeString(json, "StarknetPaperBridge_impl", vm.toString(implAddress));

        vm.stopBroadcast();

        string memory data = vm.serializeBool(json, "success", true);

        string memory localLogs = "./logs/";
        vm.createDir(localLogs, true);
        vm.writeJson(
            data,
            string.concat(localLogs, this.getEnv().ENV, ".json")
        );
    }
}

contract GetBridgeAddress is BaseScript {
    function setUp() public {}

    function run() public returns (address bridgeAddress) {
        CREATE3Factory factory = CREATE3Factory(
            this.getEnv().CREATE3_FACTORY_ADDRESS
        );

        vm.startBroadcast(this.getEnv().ACCOUNT_PRIVATE_KEY);

        bridgeAddress = factory.getDeployed(
            this.getEnv().ACCOUNT_ADDRESS,
            BRIDGE_SALT
        );

        vm.stopBroadcast();
    }
}

contract Create3 is BaseScript {
    function setUp() public {}

    function run() public returns (address) {
        if (this.isLocal()) {
            vm.startBroadcast(this.getEnv().ACCOUNT_PRIVATE_KEY);
            CREATE3Factory factory = new CREATE3Factory();
            return address(factory);
        } else {
            console.log(
                "Already deployed on",
                this.getEnv().ENV,
                "at",
                this.getEnv().CREATE3_FACTORY_ADDRESS
            );
            return address(this.getEnv().CREATE3_FACTORY_ADDRESS);
        }
    }
}
