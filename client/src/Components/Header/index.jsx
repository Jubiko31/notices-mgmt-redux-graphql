import logo from '../../assets/logo.svg'
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';


const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" style={{backgroundColor: "#a45ee5"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt='logo' style={{width:'30px'}}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Notice App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header