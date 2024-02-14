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
import { BridgeChains, ValidChainId } from "../../common/types";
import { formatEtherBalance, frenlyAddress, getExplorerLink } from "../../common/utils";
import config from "../../config";
import { colors } from "../../theme/colors";
import { AlertIcon } from "../Icons";
import { ArrowUp } from "./BridgeStepper";

export const stepsEthereum = [
  { title: "Initiating", description: <Text>Initiating transaction</Text> },
  {
    title: "Waiting for confirmation",
    description: <Text>Transaction initiated, waiting for confirmation</Text>,
  },
  { title: "Transaction Confirmed", description: <Text>Transaction Confirmed!</Text> },
];

export const stepsStarknet = [
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
    title: "Waiting for confirmation",
    description: (
      <VStack gap={0} w="full">
        <Text>Transaction initiated, waiting for confirmation</Text>
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
];

type TransactionCardProps = {
  title: string;
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
};

export const TransactionCard = ({
  title,
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
}: TransactionCardProps) => {
  const steps = fromChain === BridgeChains.Ethereum ? stepsEthereum : stepsStarknet;
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
    if (isSuccess && hash) {
      setActiveStep(1);
    }
    if (isSuccess && (isSuccessTxEthereum || isSuccessTxStarknet)) {
      setActiveStep(2);
      setTimeout(() => refreshEvents(), 5_000);
    }
  }, [isLoading, isError, isSuccess, isSuccessTxEthereum, isSuccessTxStarknet, hash, setActiveStep]);

  const onClose = () => {
    setAmount("");
    reset();
  };

  return (
    <Modal closeOnOverlayClick={false} motionPreset="slideInBottom" isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.dark" p={6} minW="580px" minH="480px" top="-20px">
        <ModalBody p={0} px={6}>
          <VStack w="full" gap={9}>
            <VStack w="full">
              <Heading>{title}</Heading>
              <Text color="text.secondary">
                {formatEtherBalance(Number(amount))} {config.branding.tokenName}
              </Text>
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
                        complete={<StepIcon color={index <= activeStep ? "green.default" : "text.secondary"} />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
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

            <Button onClick={onClose} mt={3}>
              CLOSE
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
