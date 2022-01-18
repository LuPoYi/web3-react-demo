import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const chains = {
  1: 'Ethereum',
  3: 'Ethereum testnet - Ropsten',
  4: 'Ethereum testnet - Rinkeby',
}

const injected = new InjectedConnector({
  supportedChainIds: [1, 3],
})

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    3: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  },
  qrcode: true,
  chainId: 3,
})

export { injected, walletconnect, chains }
