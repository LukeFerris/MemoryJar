import './App.css';
import SignIn from './Components/SignIn';
import { useToken } from './Components/useToken';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import config from './config';
import Routes from './routes';
import NavigationScroll from './layout/NavigationScroll';
import { MixpanelProvider } from 'react-mixpanel-browser';

// defaultTheme
import theme from './themes';

const App = () => {

  const { token, setToken } = useToken();

  if (!token) {
    return (
      <MixpanelProvider>
        <SignIn onSuccess={setToken} />
      </MixpanelProvider>
      )
  }

  const customization = {
    isOpen: [], //for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
  };

  return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme(customization)}>
        <MixpanelProvider>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
          </MixpanelProvider>
        </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App;
