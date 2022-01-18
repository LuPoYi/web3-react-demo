import {
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { injected, walletconnect, chains } from '../wallet/connectors'

const Body = ({
  balance,
  address,
  amount,
  active,
  account,
  chainId,
  handleAddressOnChange,
  handleAmountOnChange,
  handleConnectWalletOnClick,
  handleDisconnectWalletOnClick,
  handleSendEthOnClick,
}) => {
  const floatedBalance = parseFloat(balance).toFixed(4)

  const connectWalletCard = () => (
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

  const EthForm = () => (
    <Card style={{ minWidth: 400, filter: !active && 'blur(2px)', marginBottom: 30 }}>
      <CardHeader
        title="Send ETH"
        subheader={`${floatedBalance}`}
        action={<Typography style={{ margin: 8 }}>{chains[chainId]}</Typography>}
      />
      <CardContent>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          placeholder="Send to"
          style={{ marginBottom: 10 }}
          value={address}
          onChange={handleAddressOnChange}
        />
        <TextField
          fullWidth
          label="Amount"
          type="number"
          variant="outlined"
          placeholder="0.1"
          style={{ marginBottom: 10 }}
          value={amount}
          onChange={handleAmountOnChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">Ether</InputAdornment>,
          }}
        />
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={handleSendEthOnClick(address, amount)}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <Container maxWidth="sm" style={{ paddingTop: 30 }}>
      {connectWalletCard()}
      {EthForm()}
    </Container>
  )
}

export default Body
