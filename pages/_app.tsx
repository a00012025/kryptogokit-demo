import '../styles/globals.css';
import '@kryptogo/kryptogokit/styles.css';
import {
  configureChains,
  createConfig,
  getDefaultWallets,
  KryptogoKitProvider,
  WagmiConfig,
} from '@kryptogo/kryptogokit';
import type { AppProps } from 'next/app';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : [])],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'KryptoGOKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <KryptogoKitProvider chains={chains}>
        <Component {...pageProps} />
      </KryptogoKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
