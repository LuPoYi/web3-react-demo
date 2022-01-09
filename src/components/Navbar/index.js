import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'

const Navbar = ({ connectedWallet }) => {
  const displayConnectedWallet = connectedWallet
    ? `${connectedWallet.slice(0, 5)}...${connectedWallet.slice(-4)}`
    : 'No wallet connected'

  return (
    <Box>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div">
            Bob Web3 Demo - Ropsten
          </Typography>

          <Typography variant="h6" component="div" style={{ whiteSpace: 'nowrap' }}>
            {displayConnectedWallet}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
