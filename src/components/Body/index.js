import {
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import WalletIcon from '@material-ui/icons/AccountBalanceWallet'

const Body = ({
  balance,
  address,
  amount,
  account,
  handleAddressOnChange,
  handleAmountOnChange,
  handleConnectWalletOnClick,
  handleSendEthOnClick,
}) => {
  const floatedBalance = parseFloat(balance).toFixed(4)
  const connectWalletCard = () => (
    <Card style={{ minWidth: 400, padding: 10, marginBottom: 15 }}>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={handleConnectWalletOnClick}
        endIcon={<WalletIcon />}
      >
        Connect Wallet
      </Button>
    </Card>
  )

  const EthForm = () => (
    <Card style={{ minWidth: 400, filter: !account && 'blur(2px)', marginBottom: 30 }}>
      <CardHeader title="Send ETH" subheader={`${floatedBalance} ETH`} />
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
      {!account && connectWalletCard()}
      {EthForm()}
    </Container>
  )
}

export default Body
