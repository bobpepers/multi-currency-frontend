import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import {
  Button,
  MenuItem,
  Menu,
} from '@mui/material';
import { Trans } from '@lingui/macro'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import IconButton from '@mui/material/IconButton';
import GamesIcon from '@mui/icons-material/Games';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import SettingsIcon from '@mui/icons-material/Settings';

import { ReactComponent as MobileNav } from '../assets/images/mobilenav.svg';
import { ReactComponent as RunesX } from '../assets/images/runesx.svg';

import {
  fetchUserData,
} from '../actions/user';
import { authenticatedAction } from '../actions/auth';

const Header = function (props) {
  const {
    t,
    i18n,
    authenticated,
    user,
  } = props;
  const heightRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [height, setHeight] = useState(0);
  const [anchorElGames, setanchorElGames] = useState(null);
  const openGames = Boolean(anchorElGames);
  const [anchorElAdmin, setanchorElAdmin] = useState(null);
  const openAdmin = Boolean(anchorElAdmin);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useDispatch();
  useEffect(() => {
    if (authenticated) {
      dispatch(fetchUserData());
    }
  }, [authenticated]);

  useEffect(() => {
    dispatch(authenticatedAction());
  }, []);

  const handleWindowResize = useCallback((event) => {
    if (height !== heightRef.current.clientHeight) {
      setHeight(heightRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    setHeight(heightRef.current.clientHeight);
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

  const show = (menu) ? 'show' : '';

  return (
    <header className="rootRow header" style={{ height }}>
      <Navbar
        ref={heightRef}
        fixed="top"
        className="navbar navbar-default"
        expand="lg"
      >
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <MobileNav
            className="mobileNav"
          />
        </button>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`collapse navbar-collapse ${show}`}
        >
          <Nav className="mr-auto rNavbar">
            <Button
              component={Link}
              variant="outlined"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                marginRight: '10px',
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
                marginRight: '10px',
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
                      marginRight: '10px',
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
                  </Menu>
                </>
              )
            }

            {/* <Button
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={openFunctions ? 'true' : undefined}
              onClick={handleClickFunctions}
              variant="outlined"
              style={{
                fontSize: '14px',
                fontWeight: 200,
                marginRight: '10px',
              }}
            >
              Functions
            </Button>
            <Menu
              anchorEl={anchorElFunctions}
              open={openFunctions}
              onClose={handleCloseFunctions}
              MenuListProps={{
                //  'aria-labelledby': 'basic-button',
              }}
            >
              <Link
                className="nav-link"
                to="/functions/deposits"
              >
                <MenuItem onClick={handleCloseFunctions}>
                  Deposits
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/functions/withdrawals"
              >
                <MenuItem onClick={handleCloseFunctions}>
                  Withdrawals
                </MenuItem>
              </Link>

            </Menu> */}
          </Nav>
          <ul>
            <li
              style={{ marginRight: '15px' }}
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
            </li>
            <li>
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
                            <Trans>Activity</Trans>
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

            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.data,
  };
}

export default connect(mapStateToProps, null)(Header);
