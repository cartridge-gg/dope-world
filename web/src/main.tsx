import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.tsx";
import { EthereumProviders } from "./components/web3/EthereumProviders.tsx";
import { StarknetProviders } from "./components/web3/StarknetProviders.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <EthereumProviders>
        <StarknetProviders>
          <App />
        </StarknetProviders>
      </EthereumProviders>
    </ChakraProvider>
  </React.StrictMode>
);
