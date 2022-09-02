import React, {
  Suspense,
  lazy,
  createRef,
  useEffect,
} from 'react';
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import {
  Provider,
  useDispatch,
} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Button from '@mui/material/Button';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { fetchUserData } from './actions/user';
import SocketWrapper from './SocketWrapper';
import store from './reducers'
import { messages as enMessages } from './locales/en/messages'
import { messages as nlMessages } from './locales/nl/messages'
import { messages as frMessages } from './locales/fr/messages'
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/fonts/texgyreheros-regular.woff';
import './theme/style.scss';
import LoadingContainer from './containers/Loading';

const ParticlesRunebase = lazy(() => import('./components/ParticlesRunebase'));
const Header = lazy(() => import('./containers/Header'));
const Notifier = lazy(() => import('./containers/Alert'));
const Footer = lazy(() => import('./containers/Footer'));
const Routes = lazy(() => import('./routes'));

const theme = createTheme();
const notistackRef = createRef();

const styles = {
  snack: {
    position: 'absolute',
    height: 50,
    bottom: 70,
    left: 10,
    backgroundColor: 'red',
    zIndex: 8000,
  },
};

i18n.load({
  en: enMessages,
  nl: nlMessages,
  fr: frMessages,
});

i18n.activate('en');

const persistedLanguage = localStorage.getItem('language');
if (!persistedLanguage) {
  localStorage.setItem('language', 'en');
}

function DismissAction({ id }) {
  return (
    <Button onClick={() => notistackRef.current.closeSnackbar(id)}>Dismiss</Button>
  )
}

function AppWrapper() {
  return (
    <StyledEngineProvider injectFirst>
      <I18nProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <SocketWrapper>
              <SnackbarProvider
                ref={notistackRef}
                classes={{
                  root: styles.snack,
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                action={(key) => <DismissAction id={key} />}
              >
                <BrowserRouter>
                  <Suspense fallback={<LoadingContainer />}>
                    <App />
                  </Suspense>
                </BrowserRouter>
              </SnackbarProvider>
            </SocketWrapper>
          </Provider>
        </ThemeProvider>
      </I18nProvider>
    </StyledEngineProvider>
  );
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchUserData()), []);
  return (
    <>
      <Notifier />
      <ParticlesRunebase />
      <Header />
      <Routes />
      <Footer
        i18n={i18n}
      />
    </>
  );
}

createRoot(
  document.getElementById('root'),
).render(
  <AppWrapper />,
);
