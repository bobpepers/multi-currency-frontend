import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  connect,
} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  MenuItem,
  Menu,
  useMediaQuery,
} from '@mui/material';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import GamesIcon from '@mui/icons-material/Games';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import RunesX from '../assets/images/runesx.svg';
import MobileNav from '../assets/images/mobilenav.svg';

function Header(
  props,
) {
  const {
    authenticated,
    user,
  } = props;
  console.log(authenticated);
  console.log('authenticated log')
  const heightRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [anchorElGames, setanchorElGames] = useState(null);
  const [anchorElAdmin, setanchorElAdmin] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mainMenuHeight, setMainMenuHeight] = useState(0);
  const openGames = Boolean(anchorElGames);
  const openAdmin = Boolean(anchorElAdmin);
  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setMainMenuHeight(heightRef.current.clientHeight);
  }, [menu]);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleClickGames = (event) => {
    setanchorElGames(event.currentTarget);
  };
  const handleCloseGames = () => {
    setanchorElGames(null);
  };

  const handleClickAdmin = (event) => {
    setanchorElAdmin(event.currentTarget);
  };
  const handleCloseAdmin = () => {
    setanchorElAdmin(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const mainMenuItems = () => (
    <>
      <Button
        component={Link}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
          marginTop: mdDown ? '0.5rem' : '0px',
        }}
        size="large"
        to="/"
        aria-controls="basic-menu"
        aria-haspopup="true"
      >
        <RunesX
          style={{
            height: '20px',
            marginRight: '10px',
          }}
        />
        <Trans>RunesX</Trans>
      </Button>
      <Button
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={openGames ? 'true' : undefined}
        onClick={handleClickGames}
        variant="outlined"
        style={{
          fontSize: '14px',
          fontWeight: 200,
          marginRight: mdDown ? '0px' : '10px',
          marginBottom: mdDown ? '0.5rem' : '0px',
          marginTop: mdDown ? '0.5rem' : '0px',
        }}
      >
        <GamesIcon
          style={{ marginRight: '10px' }}
        />
        <Trans>Games</Trans>
      </Button>
      <Menu
        anchorEl={anchorElGames}
        open={openGames}
        onClose={handleCloseGames}
        MenuListProps={{
          //  'aria-labelledby': 'basic-button',
        }}
      >
        <Link
          className="nav-link"
          to="/gameOne"
        >
          <MenuItem onClick={handleCloseGames}>
            Game One
          </MenuItem>
        </Link>
        <Link
          className="nav-link"
          to="/gameTwo"
        >
          <MenuItem onClick={handleCloseGames}>
            Game Two
          </MenuItem>
        </Link>
      </Menu>
      {
        authenticated
              && user
              && user.role
              && user.role === 4
              && (
                <>
                  <Button
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={openAdmin ? 'true' : undefined}
                    onClick={handleClickAdmin}
                    variant="outlined"
                    style={{
                      fontSize: '14px',
                      fontWeight: 200,
                      marginRight: mdDown ? '0px' : '10px',
                      marginBottom: mdDown ? '0.5rem' : '0px',
                      marginTop: mdDown ? '0.5rem' : '0px',
                    }}
                  >
                    <AdminPanelSettingsIcon
                      style={{ marginRight: '10px' }}
                    />
                    <Trans>Admin</Trans>
                  </Button>
                  <Menu
                    anchorEl={anchorElAdmin}
                    open={openAdmin}
                    onClose={handleCloseAdmin}
                    MenuListProps={{
                      //  'aria-labelledby': 'basic-button',
                    }}
                  >
                    <Link
                      className="nav-link"
                      to="/admin/wallet"
                    >
                      <MenuItem onClick={handleCloseAdmin}>
                        Wallet
                      </MenuItem>
                    </Link>
                    <Link
                      className="nav-link"
                      to="/admin/activity"
                    >
                      <MenuItem onClick={handleCloseAdmin}>
                        Activity
                      </MenuItem>
                    </Link>
                    <Link
                      className="nav-link"
                      to="/admin/deposits"
                    >
                      <MenuItem onClick={handleCloseAdmin}>
                        Deposits
                      </MenuItem>
                    </Link>
                    <Link
                      className="nav-link"
                      to="/admin/withdrawals"
                    >
                      <MenuItem onClick={handleCloseAdmin}>
                        Withdrawals
                      </MenuItem>
                    </Link>
                    <Link
                      className="nav-link"
                      to="/admin/pricecurrencies"
                    >
                      <MenuItem onClick={handleCloseAdmin}>
                        Price Currencies
                      </MenuItem>
                    </Link>
                    <Link
                      className="nav-link"
                      to="/admin/withdrawal/settings"
                    >
                      <MenuItem onClick={handleCloseAdmin}>
                        Withdrawal settings
                      </MenuItem>
                    </Link>
                    <Link
                      className="nav-link"
                      to="/admin/withdrawal/addresses"
                    >
                      <MenuItem onClick={handleCloseAdmin}>
                        Withdrawal addresses
                      </MenuItem>
                    </Link>
                    <Link
                      className="nav-link"
                      to="/admin/errors"
                    >
                      <MenuItem onClick={handleCloseAdmin}>
                        Errors
                      </MenuItem>
                    </Link>
                  </Menu>
                </>
              )
      }
    </>
  );

  const secondaryMenuItems = () => (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <div
        style={{
          display: 'block',
          float: 'right',
        }}
      >
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="primary-search-account-menu"
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          {
            authenticated
              ? (
                <div>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/activity"
                    >
                      <AddRoadIcon
                        style={{ marginRight: '10px' }}
                      />
                      <Trans>activity</Trans>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/settings"
                    >
                      <SettingsIcon
                        style={{ marginRight: '10px' }}
                      />
                      <Trans>Settings</Trans>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/logout"
                    >
                      <LogoutIcon
                        style={{ marginRight: '10px' }}
                      />
                      <Trans>Logout</Trans>
                    </Link>
                  </MenuItem>
                </div>
              )
              : (
                <div>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/login"
                    >
                      <LoginIcon
                        style={{ marginRight: '10px' }}
                      />
                      <Trans>Login</Trans>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      className="nav-link"
                      to="/register"
                    >
                      <AppRegistrationIcon
                        style={{ marginRight: '10px' }}
                      />
                      <Trans>Register</Trans>
                    </Link>
                  </MenuItem>
                </div>
              )

          }
        </Menu>
      </div>
      <div
        style={{
          display: 'block',
          float: 'right',
        }}
      >
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          component={Link}
          to="/wallet"
        >
          <AccountBalanceWallet />
        </IconButton>
      </div>

    </Box>
  );

  return (
    <div
      className="header initHeaderHeight"
      style={{
        height: mainMenuHeight,
      }}
    >
      <AppBar
        position="relative"
        className="navbar"
        sx={{
          width: '100%',
        }}
      >
        <Toolbar
          disableGutters
          variant="dense"
          ref={heightRef}
          sx={{
            width: '100%',
            paddingBottom: '0.5rem',
            paddingTop: '0.5rem',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              flexDirection: 'column',
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                flexDirection: 'row',
                display: {
                  xs: 'flex',
                  md: 'none',
                },
              }}
            >
              <IconButton
                size="large"
                aria-label="Mobile Navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleMenu}
                className="navbar-toggler"
                sx={{
                  padding: 0,
                }}
              >
                <MobileNav
                  className="mobileNav"
                />
              </IconButton>
              {secondaryMenuItems()}
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                flexDirection: 'column',
                alignSelf: 'flex-start',
                display: {
                  xs: menu ? 'flex' : 'none',
                  md: 'none',
                },
              }}
            >
              {mainMenuItems()}
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            {mainMenuItems()}
            {secondaryMenuItems()}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.number.isRequired,
  }).isRequired,
  authenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.data,
  };
}

export default connect(mapStateToProps, null)(Header);
