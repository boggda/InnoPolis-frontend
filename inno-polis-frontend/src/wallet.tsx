import { AuthAdapter, MFA_LEVELS } from "@web3auth/auth-adapter";
import { UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { getDefaultExternalAdapters, getInjectedAdapters } from "@web3auth/default-evm-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions } from "@web3auth/modal";
import { BUTTON_POSITION, CONFIRMATION_STRATEGY, WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

import { chain } from "./config/chains.tsx";

//const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";
const clientId = 'BGs7ZtLUyzUYJNXA9ZLOpMiIqRT-lsV2kESHIQ3iORck36ugyhUljKi3ts7Qo4XMptv9dAK-EBF2qmm4Z5Lyz-s';

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: chain.base,
  },
});

const web3AuthOptions: Web3AuthOptions = {
  chainConfig: chain.base,
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  uiConfig: {
    logoDark: 'https://web3auth.io/images/BrandLogo.png',
    logoLight: 'https://web3auth.io/images/BrandLogo.png'
  }
};

const authAdapter = new AuthAdapter({
  loginSettings: {
    mfaLevel: MFA_LEVELS.OPTIONAL,
  },
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT, // "redirect" | "popup"
  },
});

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: {
    whiteLabel: { showWidgetButton: true, buttonPosition: BUTTON_POSITION.BOTTOM_RIGHT },
    confirmationStrategy: CONFIRMATION_STRATEGY.MODAL,
  },
});

const adapters = await getInjectedAdapters({ options: web3AuthOptions });


const web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [...adapters],
  plugins: [walletServicesPlugin],
};

export default web3AuthContextConfig;