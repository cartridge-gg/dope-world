import { useEffect, useState } from "react";
import useProviders from "./useProviders";

import config from "../config";
import { addLeadingZeroEth, formatBalance, getEthereumBridgeAddress, getStarknetBridgeAddress } from "../common/utils";
import { num, uint256, hash } from "starknet";
import { BridgeChains, BridgeDirection } from "../common/types";

export type HistoryEvent = {
  blocknumber: number;
  timestamp: Date;
  event: any;
  hash: string | undefined;
  action: string;
  direction: BridgeDirection;
  amount: string;
  rawAmount: bigint;
  recipient: string;
  withdrawable: boolean;
  l2TxHash: string | undefined;
  starknetTxStatus: string | undefined;
};

const estimateTime = (chain: BridgeChains, currentBlocknumber: bigint, blocknumber: bigint) => {
  const blockDiff = Number(currentBlocknumber - blocknumber);
  const blockFreq = chain === BridgeChains.Ethereum ? 12 : 150;

  const now = Date.now();
  const est = now - blockDiff * blockFreq * 1_000;
  return new Date(est);
};

export default function useHistory() {
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  const [ethereumEvents, setEthereumEvents] = useState<HistoryEvent[]>([]);
  const [starknetEvents, setStarknetEvents] = useState<HistoryEvent[]>([]);

  const [actionCount, setActionCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [refreshMe, setRefreshMe] = useState(0);

  const {
    ethereumWebSocketClient,
    ethereumChainId,
    ethereumAccount,

    starknetProvider,
    starknetAccount,
  } = useProviders();

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoadingEvents(true);

      // Ethereum Events
      let ethereumBridgeDepositEvents: HistoryEvent[] = [];
      let ethereumBridgeWithdrawalEvents: HistoryEvent[] = [];
      if (ethereumWebSocketClient) {
        const ethereumBlocknumber = await ethereumWebSocketClient.getBlockNumber();
        // 7200 eth block ~12s = 1 day
        const fromBlockEthereum = ethereumBlocknumber > 3 * 7200 ? ethereumBlocknumber - 3n * 7200n : 0n;

        //
        // LogDeposit
        //
        // event LogDeposit( address indexed l1Sender, uint256 amount, uint256 l2Recipient );
        try {
          const filterBridgeDeposit = await ethereumWebSocketClient.createContractEventFilter({
            abi: config.bridge.l1.abi,
            address: getEthereumBridgeAddress(ethereumChainId),
            eventName: "LogDeposit",
            args: {
              l1Sender: ethereumAccount.address,
            },
            fromBlock: fromBlockEthereum,
          });
          const bridgeDepositEthereum = await ethereumWebSocketClient.getFilterLogs({ filter: filterBridgeDeposit });

          ethereumBridgeDepositEvents = bridgeDepositEthereum.map((e: any) => {
            return {
              blocknumber: Number(e.blockNumber),
              timestamp: estimateTime(BridgeChains.Ethereum, ethereumBlocknumber, BigInt(e.blockNumber)),
              event: e,
              hash: e.transactionHash,
              action: "Bridge",
              direction: BridgeDirection.FromEthereumToStarknet,
              amount: formatBalance(e.args.amount),
              rawAmount: e.args.amount,
              recipient: num.toHexString(e.args.l2Recipient),
              withdrawable: false,
              l2TxHash: undefined,
              starknetTxStatus: undefined,
            };
          });
        } catch (e) {
          console.log(e);
        }

        //
        // LogWithdrawal
        //
        //event LogWithdrawal(address indexed l1Recipient, uint256 amount);
        try {
          const filterBridgeWithdrawal = await ethereumWebSocketClient.createContractEventFilter({
            abi: config.bridge.l1.abi,
            address: getEthereumBridgeAddress(ethereumChainId),
            eventName: "LogWithdrawal",
            args: {
              l1Recipient: ethereumAccount.address,
            },
            fromBlock: fromBlockEthereum,
          });
          const bridgeWithdrawalEthereum = await ethereumWebSocketClient.getFilterLogs({
            filter: filterBridgeWithdrawal,
          });

          ethereumBridgeWithdrawalEvents = bridgeWithdrawalEthereum.map((e: any) => {
            return {
              blocknumber: Number(e.blockNumber),
              timestamp: estimateTime(BridgeChains.Ethereum, ethereumBlocknumber, BigInt(e.blockNumber)),
              event: e,
              hash: e.transactionHash,
              action: "Withdrawal",
              direction: BridgeDirection.FromEthereumToStarknet,
              amount: formatBalance(e.args.amount),
              rawAmount: e.args.amount,
              recipient: num.toHexString(e.args.l1Recipient),
              withdrawable: false,
              l2TxHash: num.toHexString(e.args.l2TxHash),
              starknetTxStatus: undefined,
            };
          });
        } catch (e) {
          console.log(e);
        }
      }

      // Starknet Events
      let starknetBridgeWithdrawalInitiatedEvents: HistoryEvent[] = [];

      try {
        if (starknetAccount.address) {
          // struct WithdrawalInitiated {
          //     #[key]
          //     sender: ContractAddress,
          //     recipient: felt252,
          //     amount: u256
          // }
          const starknetBlock = await starknetProvider.getBlock("latest");
          const starknetBlockNumber = starknetBlock.block_number;
          // 1440 sn block ~60s = 1 day
          const fromBlockStarknet = starknetBlockNumber > 2 * 1440 ? starknetBlockNumber - 2 * 1440 : 0;

          const withdrawalInitiatedSelector = num.toHex(hash.starknetKeccak("WithdrawalInitiated"));

          // @ts-ignore
          const { events: withdrawalInitiatedEvents } = await starknetProvider.getEvents({
            address: getStarknetBridgeAddress(ethereumChainId),
            from_block: { block_number: fromBlockStarknet },
            to_block: { block_number: starknetBlockNumber },
            keys: [[withdrawalInitiatedSelector], [starknetAccount.address || "0x0"]],
            chunk_size: 50,
          });

          starknetBridgeWithdrawalInitiatedEvents = withdrawalInitiatedEvents.map((e: any) => {
            const amount_uint256 = { low: BigInt(e.data[1]), high: BigInt(e.data[2]) };
            const amount = uint256.uint256ToBN(amount_uint256);
            const withdrawable = !ethereumBridgeWithdrawalEvents.find((i) => i.l2TxHash === e.transaction_hash);

            return {
              blocknumber: Number(e.block_number),
              timestamp: estimateTime(BridgeChains.Starknet, BigInt(starknetBlockNumber), BigInt(e.block_number)),
              event: e,
              hash: e.transaction_hash,
              action: "Bridge",
              direction: BridgeDirection.FromStarknetToEthereum,
              amount: formatBalance(amount),
              rawAmount: amount,
              recipient: addLeadingZeroEth(e.data[0]),
              withdrawable,
              l2TxHash: undefined,
              starknetTxStatus: undefined,
            };
          });
        }
      } catch (e) {
        console.log(e);
      }

      setEthereumEvents(
        [...ethereumBridgeDepositEvents, ...ethereumBridgeWithdrawalEvents].sort((a, b) =>
          a.blocknumber < b.blocknumber ? 1 : -1
        )
      );
      setStarknetEvents(
        [...starknetBridgeWithdrawalInitiatedEvents].sort((a, b) => (a.blocknumber < b.blocknumber ? 1 : -1))
      );

      setIsLoadingEvents(false);
    };

    if (
      ethereumAccount.address &&
      starknetAccount.address &&
      ethereumAccount.isConnected &&
      starknetAccount.isConnected
    ) {
      loadEvents();
    } else {
      setEthereumEvents([]);
      setStarknetEvents([]);
      setActionCount(0);
      setPendingCount(0);
    }
  }, [
    ethereumAccount.address,
    ethereumAccount.isConnected,
    ethereumChainId,
    ethereumWebSocketClient,
    starknetAccount.address,
    starknetAccount.isConnected,
    refreshMe,
  ]);

  useEffect(() => {
    const loadTxsStatus = async () => {
      setIsLoadingStatus(true);
      try {
        for (let event of starknetEvents) {
          if (event.withdrawable) {
            const receipt = await starknetProvider.getTransactionReceipt(event.hash || 0);
            // @ts-ignore
            event.starknetTxStatus = receipt.finality_status;

            await new Promise((r) => setTimeout(r, 1000));
          }
        }
      } catch (e: any) {
        console.log(e);
      }
      setActionCount(starknetEvents.filter((i) => i.withdrawable && i.starknetTxStatus === "ACCEPTED_ON_L1").length);
      setPendingCount(starknetEvents.filter((i) => i.withdrawable && i.starknetTxStatus === "ACCEPTED_ON_L2").length);
      setIsLoadingStatus(false);
    };

    if (starknetEvents.length > 0) {
      loadTxsStatus();
    } else {
      setActionCount(0);
      setPendingCount(0);
    }
  }, [starknetEvents]);

  const refresh = () => {
    setRefreshMe(refreshMe + 1);
  };

  return {
    ethereumEvents,
    starknetEvents,
    isLoading: isLoadingEvents || isLoadingStatus,
    actionCount,
    pendingCount,
    refresh,
  };
}
