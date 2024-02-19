import { Box, Step, StepIcon, StepIndicator, StepNumber, StepStatus, StepTitle, Stepper } from "@chakra-ui/react";

import { BridgeDirection } from "../../common/types";
import config from "../../config";
import { colors } from "../../theme/colors";

export const stepsEthereum = [
  { title: "Connect", description: "Connect your wallets" },
  {
    title: "Approve",
    description: `Approve Bridge to spend ${config.branding.tokenName}`,
  },
  { title: "Send", description: "Send it to Starknet!" },
];

export const stepsStarknet = [
  { title: "Connect", description: "Connect your wallets" },
  {
    title: "Send",
    description: "Send it to Ethereum!",
  },
  { title: "Withdraw on ETH", description: "Withdraw on Ethereum" },
];

export const BridgeStepper = ({ direction, activeStep }: { direction: BridgeDirection; activeStep: number }) => {
  const steps = direction === BridgeDirection.FromEthereumToStarknet ? stepsEthereum : stepsStarknet;
  const timeEst = direction === BridgeDirection.FromEthereumToStarknet ? "" : "~4 hrs";

  return (
    <Box w="auto" position="relative">
      <Stepper w="560px" colorScheme="grayscale" alignItems="center" gap={6} index={activeStep}>
        {steps.map((step, index) => (
          // @ts-ignore
          <Step key={index} display="flex" flexDirection="column" flex="1 !important" zIndex="1">
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
                color={index <= activeStep ? "text.default" : "text.secondary"}
                bgColor={index === activeStep ? "bg.light" : "transparent"}
                position="relative"
              >
                {index === activeStep && <ArrowUp color={colors.bg.light} />}
                {step.title}
              </StepTitle>
              {/* <Text whiteSpace="nowrap" color="neon.500" fontSize="small">
              {step.description}
            </Text> */}
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

      {timeEst !== "" && (
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
          {timeEst}
        </Box>
      )}
    </Box>
  );
};

export const ArrowUp = ({ color }: { color: string }) => {
  return (
    <Box
      w="0"
      h="0"
      position="absolute"
      borderLeft="10px solid transparent"
      borderRight="10px solid transparent"
      borderBottom={`7px solid ${color}`}
      left="50%"
      transform="translateX(-50%)"
      top="-7px"
    ></Box>
  );
};
