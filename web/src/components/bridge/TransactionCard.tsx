import {
  Box,
  Button,
  HStack,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Progress,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  VStack,
  useSteps,
} from "@chakra-ui/react";

import { useWaitForTransaction as useWaitForTransactionStarknet } from "@starknet-react/core";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Address,
  useChainId as useEthereumChainId,
  useWaitForTransaction as useWaitForTransactionEthereum,
} from "wagmi";
import { BridgeActions, BridgeChains, ValidChainId } from "../../common/types";
import { formatEtherBalance, frenlyAddress, getExplorerLink } from "../../common/utils";
import config from "../../config";
import { colors } from "../../theme/colors";
import { AlertIcon, CheckedIcon } from "../Icons";
import { ArrowUp } from "./BridgeStepper";

export const transactionSteps = [
  { title: "Initiating", description: <Text>Initiating transaction</Text> },
  {
    title: "Waiting for confirmation",
    description: <Text>Transaction initiated, waiting for confirmation</Text>,
  },
  { title: "Transaction Confirmed", description: <Text>Transaction Confirmed!</Text> },
];

export const starknetToEthereumSteps = [
  {
    title: "Initiating",
    description: (
      <VStack gap={0} w="full">
        <Text>Initiating transaction</Text>
        <Text color="text.primary">{`Return to Paper Bridge in ~4hrs to claim your ${config.branding.tokenName}`}</Text>
      </VStack>
    ),
  },
  {
    title: "Transaction Confirmed",
    description: (
      <VStack gap={0} w="full">
        <Text>Transaction Confirmed!</Text>
        <Text color="text.primary">{`Return to Paper Bridge in ~4hrs to claim your ${config.branding.tokenName}`}</Text>
      </VStack>
    ),
  },
  {
    title: "Withdraw on Ethereum",
    description: (
      <VStack gap={0} w="full">
        <Text>Transaction Confirmed!</Text>
        <Text color="text.primary">{`Return to Paper Bridge in ~4hrs to claim your ${config.branding.tokenName}`}</Text>
      </VStack>
    ),
  },
];

export const ethereumToStarknetSteps = [
  {
    title: "Initiating",
    description: (
      <VStack gap={0} w="full">
        <Text>Initiating transaction</Text>
      </VStack>
    ),
  },
  {
    title: "Transaction Confirmed",
    description: (
      <VStack gap={0} w="full">
        <Text>Transaction Confirmed!</Text>
        <Text color="text.primary">{`You will receive your ${config.branding.tokenName} in a few minutes!`}</Text>
      </VStack>
    ),
  },
  {
    title: "Receive on Starknet",
    description: (
      <VStack gap={0} w="full">
        <Text>Transaction Confirmed!</Text>
        <Text color="text.primary">{`You will receive your ${config.branding.tokenName} in a few minutes!`}</Text>
      </VStack>
    ),
  },
];

const stepsByAction = {
  [BridgeActions.ApproveEthereumBridge]: transactionSteps,
  [BridgeActions.WithdrawFromEthereumBridge]: transactionSteps,
  [BridgeActions.BridgeToEthereum]: starknetToEthereumSteps,
  [BridgeActions.BridgeToStarknet]: ethereumToStarknetSteps,
};

const bridgingDuration = {
  [BridgeActions.ApproveEthereumBridge]: undefined,
  [BridgeActions.WithdrawFromEthereumBridge]: undefined,
  [BridgeActions.BridgeToEthereum]: "~4h",
  [BridgeActions.BridgeToStarknet]: "~5min",
};

type TransactionCardProps = {
  action: BridgeActions;
  fromChain: BridgeChains;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  hash: string | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  reset: VoidFunction;
  refreshEvents: VoidFunction;
  onClose: VoidFunction;
};

export const TransactionCard = ({
  action,
  fromChain,
  amount,
  setAmount,
  hash,
  isLoading,
  isSuccess,
  isError,
  error,
  reset,
  refreshEvents,
  onClose,
}: TransactionCardProps) => {
  const steps = stepsByAction[action];
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length });

  const ethereumChainId = useEthereumChainId() as ValidChainId;

  const {
    // data: txDataEthereum,
    isError: isErrorTxEthereum,
    isLoading: isLoadingTxEthereum,
    isSuccess: isSuccessTxEthereum,
  } = useWaitForTransactionEthereum({
    hash: hash as Address,
    enabled: fromChain === BridgeChains.Ethereum,
  });

  const {
    // data: txDataStarknet,
    isError: isErrorTxStarknet,
    isLoading: isLoadingTxStarknet,
    isSuccess: isSuccessTxStarknet,
    // isPending: isPendingTxStarknet,
  } = useWaitForTransactionStarknet({
    hash,
    enabled: fromChain === BridgeChains.Starknet,
    watch: true,
  });

  useEffect(() => {
    // transaction steps
    if (action === BridgeActions.ApproveEthereumBridge || action === BridgeActions.WithdrawFromEthereumBridge) {
      if (isSuccess && hash) {
        setActiveStep(1);
      }
      if (isSuccess && (isSuccessTxEthereum || isSuccessTxStarknet)) {
        setActiveStep(2);
        setTimeout(() => refreshEvents(), 5_000);
      }
    }

    // bridging steps
    if (action === BridgeActions.BridgeToEthereum || action === BridgeActions.BridgeToStarknet) {
      if (isSuccess && (isSuccessTxEthereum || isSuccessTxStarknet)) {
        setActiveStep(2);
        setTimeout(() => refreshEvents(), 5_000);
      }
    }
  }, [isLoading, isError, isSuccess, isSuccessTxEthereum, isSuccessTxStarknet, hash, setActiveStep]);

  const onCloseClick = () => {
    if (action !== BridgeActions.ApproveEthereumBridge) {
      setAmount("");
    }
    reset();
    if (isSuccess) {
      onClose();
    }
  };

  return (
    <Modal closeOnOverlayClick={false} motionPreset="slideInBottom" isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.dark" p={6} minW="580px" minH="480px" top="40px">
        <ModalBody p={0} px={6}>
          <VStack w="full" gap={9}>
            <VStack w="full">
              <Heading>{action}</Heading>
              {Number(amount) > 0 && (
                <Text color="text.secondary">
                  {formatEtherBalance(Number(amount))} {config.branding.tokenName}
                </Text>
              )}
            </VStack>

            <Box position="relative">
              <Stepper colorScheme="grayscale" alignItems="flex-start !important" gap={6} index={activeStep}>
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    // @ts-ignore
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      flex: "1 !important",
                      width: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                      zIndex: "1",
                    }}
                  >
                    <StepIndicator>
                      <StepStatus
                        complete={
                          index <= activeStep ? <CheckedIcon color="green" /> : <StepIcon color="text.secondary" />
                        }
                        incomplete={<StepNumber />}
                        active={
                          (action === BridgeActions.BridgeToEthereum || action === BridgeActions.BridgeToStarknet) &&
                          index === 2 ? (
                            <></>
                          ) : (
                            <CheckedIcon color="green" />
                          )
                        }
                      />
                    </StepIndicator>

                    <Box flexShrink="0" whiteSpace={"break-spaces"}>
                      <StepTitle
                        // @ts-ignore
                        p={2}
                        px={4}
                        borderRadius={8}
                        mt={1}
                        color={index === activeStep ? "text.default" : "text.secondary"}
                        bgColor={index === activeStep ? "bg.light" : "transparent"}
                        textAlign="center"
                        position="relative"
                      >
                        {index === activeStep && <ArrowUp color={colors.bg.light} />}
                        {step.title}
                      </StepTitle>
                    </Box>
                  </Step>
                ))}
              </Stepper>

              <Box
                w="66%"
                left="50%"
                transform="translateX(-50%)"
                position="absolute"
                borderBottom="solid 3px"
                borderColor="bg.light !important"
                top="14px"
                zIndex="0"
              ></Box>

              {bridgingDuration[action] && (
                <Box
                  left="61%"
                  position="absolute"
                  border="solid 1px"
                  borderColor="bg.light !important"
                  bg="bg.light !important"
                  top="4px"
                  zIndex="1"
                  borderRadius={12}
                  px={2}
                >
                  {bridgingDuration[action]}
                </Box>
              )}
            </Box>

            <VStack w="full" gap={6}>
              {!error && !isErrorTxEthereum && !isErrorTxStarknet && (
                <VStack w="full" textAlign="center">
                  {/* <Text fontWeight="bold" fontSize="16px">
                    {steps[activeStep].title}
                  </Text> */}
                  {/* <Text textAlign="center" dangerouslySetInnerHTML={{ __html: steps[activeStep].description }}></Text> */}
                  {steps[activeStep].description}
                </VStack>
              )}

              <Progress
                isIndeterminate={isLoading || isLoadingTxEthereum || isLoadingTxStarknet}
                w="full"
                colorScheme="cryellow"
                borderRadius={6}
                bg="bg.light"
              />

              {(error || isErrorTxEthereum || isErrorTxStarknet) && (
                <VStack w="full" color="error.default">
                  <HStack w="full" justifyContent="center">
                    <AlertIcon width="20px" height="20px" />
                    <Text fontWeight="bold">An error has occured</Text>
                  </HStack>
                  <Text maxW="100%">{error && error.message ? error.message : JSON.stringify(error, null, 2)}</Text>
                </VStack>
              )}

              {/* {!error && !isErrorTxEthereum && !isErrorTxStarknet && ( */}
              <VStack w="full" color="text.secondary">
                <Text fontWeight="bold" fontSize="11px">
                  TX HASH
                </Text>
                <Text>
                  {hash ? (
                    <Link isExternal href={`${getExplorerLink(fromChain, ethereumChainId, "tx", hash)}`}>
                      {frenlyAddress(hash)}
                    </Link>
                  ) : (
                    "Waiting for transaction confirmation"
                  )}
                </Text>
              </VStack>
              {/* )} */}
            </VStack>

            <Button onClick={onCloseClick} mt={3}>
              CLOSE
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
