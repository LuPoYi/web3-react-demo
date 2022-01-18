import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

import { Snackbar } from '@material-ui/core'
import Navbar from './components/Navbar'
import Body from './components/Body'

function App() {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState(0)
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
  })
  const [signer, setSigner] = useState()
  const { active, account, library, chainId, activate, deactivate } = useWeb3React()

  const handleConnectWalletOnClick = (connector) => async () => {
    try {
      await activate(connector)
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleDisconnectWalletOnClick = async () => {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleSendEthOnClick = (address, amount) => () => {
    signer
      .sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount),
      })
      .then(({ hash }) => {
        setSnackbarState({ open: true, message: `Transaction sent. TXID: ${hash}` })
        setAmount('')
      })
      .catch((error) => {
        console.log('sendTransaction error', error)
        setSnackbarState({ open: true, message: error })
      })
  }

  const handleSnackbarOnClose = () => setSnackbarState({ open: false, message: '' })
  const handleAddressOnChange = (e) => setAddress(e.target.value)
  const handleAmountOnChange = (e) => setAmount(e.target.value)

  useEffect(() => {
    if (library) {
      const fetchSigner = async () => {
        setSigner(library.getSigner())
        setBalance(ethers.utils.formatEther(await library.getBalance(account)))
      }

      fetchSigner()
    }
  }, [library, account])

  return (
    <div className="App">
      <Navbar account={account} />
      <Body
        balance={balance}
        address={address}
        amount={amount}
        account={account}
        active={active}
        chainId={chainId}
        handleAddressOnChange={handleAddressOnChange}
        handleAmountOnChange={handleAmountOnChange}
        handleConnectWalletOnClick={handleConnectWalletOnClick}
        handleDisconnectWalletOnClick={handleDisconnectWalletOnClick}
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
