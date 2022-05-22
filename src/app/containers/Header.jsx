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
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import IconButton from '@mui/material/IconButton';
import { Trans } from '@lingui/macro'
import GamesIcon from '@mui/icons-material/Games';
import { ReactComponent as MobileNav } from '../assets/images/mobilenav.svg';
import { ReactComponent as RunesX } from '../assets/images/runesx.svg';
import {
  fetchUserData,
} from '../actions/user';

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
  const [anchorElFunctions, setAnchorElFunctions] = useState(null);
  const openFunctions = Boolean(anchorElFunctions);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useDispatch();
  useEffect(() => {
    if (authenticated) {
      dispatch(fetchUserData());
    }
  }, [authenticated]);

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

  const handleClickManagement = (event) => {
    setanchorElGames(event.currentTarget);
  };
  const handleCloseGames = () => {
    setanchorElGames(null);
  };

  const handleClickFunctions = (event) => {
    setAnchorElFunctions(event.currentTarget);
  };
  const handleCloseFunctions = () => {
    setAnchorElFunctions(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
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
            {/*
            <Link
              className="nav-link"
              to="/activity"
            >
              Activity
            </Link>
            */}

            <Button
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={openGames ? 'true' : undefined}
              onClick={handleClickManagement}
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
                to="/management/bot/settings"
              >
                <MenuItem onClick={handleCloseGames}>
                  Bot Settings
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/management/features"
              >
                <MenuItem onClick={handleCloseGames}>
                  Feature Settings
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/management/servers"
              >
                <MenuItem onClick={handleCloseGames}>
                  Servers
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/management/channels"
              >
                <MenuItem onClick={handleCloseGames}>
                  Channels
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/management/users"
              >
                <MenuItem onClick={handleCloseGames}>
                  Users
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/management/trivia"
              >
                <MenuItem onClick={handleCloseGames}>
                  Trivia
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/management/pricecurrencies"
              >
                <MenuItem onClick={handleCloseGames}>
                  Price Currencies
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/management/dashboardusers"
              >
                <MenuItem onClick={handleCloseGames}>
                  DashboardUsers
                </MenuItem>
              </Link>
              <Link
                className="nav-link"
                to="/management/withdrawaladdresses"
              >
                <MenuItem onClick={handleCloseGames}>
                  WithdrawalAddresses
                </MenuItem>
              </Link>
            </Menu>

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
                            activity
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                          <Link
                            className="nav-link"
                            to="/settings"
                          >
                            settings
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                          <Link
                            className="nav-link"
                            to="/logout"
                          >
                            logout
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
                            login
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                          <Link
                            className="nav-link"
                            to="/register"
                          >
                            register
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

export default connect(mapStateToProps)(Header);
