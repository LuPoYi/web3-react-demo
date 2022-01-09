import { useState } from 'react'
import Web3 from 'web3'
import { Snackbar } from '@material-ui/core'
import Navbar from './components/Navbar'
import Body from './components/Body'

function App() {
  const web3Utils = new Web3(window.ethereum)?.utils
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [connectedWallet, setConnectedWallet] = useState(false)
  const [balance, setBalance] = useState(0)
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
  })

  const handleConnectWalletOnClick = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts?.length > 0) {
      setConnectedWallet(accounts[0])
      setSnackbarState({ open: true, message: 'Wallet Connected!' })

      const balanceHex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      })
      setBalance(
        parseFloat(web3Utils.fromWei(web3Utils.hexToNumberString(balanceHex), 'ether')).toFixed(4)
      )
    }
  }

  const handleSendEthOnClick = (address, amount) => () => {
    const hexAmount = parseInt(web3Utils.toWei(String(amount), 'ether')).toString(16)

    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedWallet,
            to: address,
            value: hexAmount,
          },
        ],
      })
      .then((txHash) =>
        setSnackbarState({ open: true, message: `Transaction sent. TXID: ${txHash}` })
      )
      .catch((error) => {
        console.log('sendTransaction error', error)
        setSnackbarState({ open: true, message: error?.message })
      })
  }

  const handleSnackbarOnClose = () => setSnackbarState({ open: false, message: '' })
  const handleAddressOnChange = (e) => setAddress(e.target.value)
  const handleAmountOnChange = (e) => setAmount(e.target.value)

  return (
    <div className="App">
      <Navbar connectedWallet={connectedWallet} />
      <Body
        balance={balance}
        address={address}
        amount={amount}
        connectedWallet={connectedWallet}
        handleAddressOnChange={handleAddressOnChange}
        handleAmountOnChange={handleAmountOnChange}
        handleConnectWalletOnClick={handleConnectWalletOnClick}
        handleSendEthOnClick={handleSendEthOnClick}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={5000}
        open={snackbarState.open}
        message={snackbarState.message}
        onClose={handleSnackbarOnClose}
      />
    </div>
  )
}

export default App
