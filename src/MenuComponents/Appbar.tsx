import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Menu, Container, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../Redux/hooks';
import { selectAuth } from '../Redux/authSlice';
import { logoutStaff } from '../utils/staffRequests';

const pages = ['homePage', 'createOrderPage', 'openOrdersPage', 'myOrdersPage', 'itemsPage']

function Appbar() {

  const authState = useAppSelector(selectAuth)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false)

  const handleClickOpen = () => {
    setOpenLogoutDialog(true)
  }

  const handleClose = () => {
    setOpenLogoutDialog(false)
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const navToPage = (page: string) => {
    const pageLink = page === 'homePage' ? '' : page.slice(0, page.length - 4)
    navigate('/' + pageLink, {replace: true})
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size='large'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs: 'block', md: 'none'}}}
            >
              {
                authState.isAuthenticated ?
                  pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Button
                        key={page}
                        onClick={() => navToPage(page)}
                        sx={{my: 2, color: 'white', display: 'block'}}
                      >
                        {t(page)}
                      </Button>
                    </MenuItem>
                  ))
                  :
                  <MenuItem key={'login'} onClick={handleCloseNavMenu}>
                    <Button
                      key={'login'}
                      onClick={() => navToPage('login')}
                      sx={{my: 2, color: 'white', display: 'block'}}
                    >
                      {t('loginPage')}
                    </Button>
                  </MenuItem>
              }
            </Menu>
          </Box>
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {
              authState.isAuthenticated ?
                pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => navToPage(page)}
                    sx={{my: 2, color: 'white', display: 'block'}}
                  >
                    {t(page)}
                  </Button>
                ))
                :
                <Button
                  key={'login'}
                  onClick={() => navToPage('login')}
                  sx={{my: 2, color: 'white', display: 'block'}}
                >
                  {t('loginPage')}
                </Button>
            }
          </Box>
          <Box sx={{flexGrow: 0}}>
            <LanguageSelector/>
          </Box>
          {
            authState.isAuthenticated &&
              <Box sx={{marginLeft: 1}}>
                <Button
                  color={'primary'}
                  variant={'contained'}
                  onClick={handleClickOpen}
                >
                  {t('logout')}
                </Button>
                  <Dialog
                    open={openLogoutDialog}
                    onClose={handleClose}
                  >
                    <DialogTitle>
                      {t('logout')}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        {t('wantToLogout')}
                      </DialogContentText>
                    </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color={'secondary'}>{t('back')}</Button>
                        <Button
                          onClick={() => {
                            logoutStaff()
                            handleClose()
                          }}
                          color={'primary'}
                          variant={'contained'}
                          autoFocus
                        >
                          {t('logout')}
                        </Button>
                      </DialogActions>
                  </Dialog>
              </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Appbar;
