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
  const [provider, setProvider] = useState()
  const [signer, setSigner] = useState()
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const handleConnectWalletOnClick = (connector) => async () => {
    try {
      //await activate(injected)
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
      .then(({ hash }) =>
        setSnackbarState({ open: true, message: `Transaction sent. TXID: ${hash}` })
      )
      .catch((error) => {
        console.log('sendTransaction error', error)
        setSnackbarState({ open: true, message: error?.message })
      })
  }

  const handleSnackbarOnClose = () => setSnackbarState({ open: false, message: '' })
  const handleAddressOnChange = (e) => setAddress(e.target.value)
  const handleAmountOnChange = (e) => setAmount(e.target.value)

  useEffect(() => {
    if (account) {
      // TODO: support walletConnect provider
      const fetchProvider = async () => {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(web3Provider)
        setSigner(web3Provider.getSigner())
        setBalance(ethers.utils.formatEther(await web3Provider.getBalance(account)))
      }

      fetchProvider()
    }
  }, [account])

  return (
    <div className="App">
      <Navbar account={account} />
      <Body
        balance={balance}
        address={address}
        amount={amount}
        account={account}
        active={active}
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
