import { Button, Card } from '@material-ui/core'

import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { injected, walletconnect } from '../wallet/connectors'

const Wallet = ({ active, account, handleConnectWalletOnClick, handleDisconnectWalletOnClick }) => {
  return (
    <Card style={{ minWidth: 400, padding: 10, marginBottom: 15 }}>
      {!active ? (
        <>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleConnectWalletOnClick(injected)}
            endIcon={<WalletIcon />}
            style={{ marginBottom: 10 }}
          >
            Metamask
          </Button>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleConnectWalletOnClick(walletconnect)}
            endIcon={<WalletIcon />}
          >
            Wallet Connect
          </Button>
        </>
      ) : (
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          onClick={handleDisconnectWalletOnClick}
        >
          {account}
          <br />
          Disconnect Wallet
        </Button>
      )}
    </Card>
  )
}

export default Wallet
