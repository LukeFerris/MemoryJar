import './App.css';
import AudioList from './Components/AudioList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import useToken from './Components/useToken';

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <SignIn onSuccess={setToken} />
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={AudioList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
