import './App.css';
import AudioList from './Components/AudioList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import useToken from './Components/useToken';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import config from './config';
import Routes from './routes';
import NavigationScroll from './layout/NavigationScroll';

// defaultTheme
import theme from './themes';

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <SignIn onSuccess={setToken} />
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
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
    // <Router>
    //   <div>
    //     <Switch>
    //       <Route exact path="/" component={AudioList} />
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;
