import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const resetWalletConnector = (connector) => {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined
  }
}

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: 'https://mainnet.mycustomnode.com',
    3: 'https://ropsten.mycustomnode.com',
  },
  qrcode: true,
})

export { injected, walletconnect }
