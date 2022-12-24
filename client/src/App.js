import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './components/homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frontpage from './components/frontpage';
import VotingPage from './components/player/party/voting-page';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/"><Frontpage /></Route>
          <Route path="/joinme"><VotingPage /></Route>
          <Route path="/app"> <Homepage /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
