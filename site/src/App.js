import './App.css';
import AudioList from './Components/AudioList'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './Components/SignIn'

let isLoggedIn = false;

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            isLoggedIn ? (
              <AudioList />
            ) : (
              <Redirect to="/signin" />
            )
          )} />
          <Route exact path='/signin' component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
