import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './components/homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frontpage from './components/frontpage';
import NavHistory from './components/navhistory';

function App() {
  return (
    <Router>
      {/*<NavHistory />*/}
      <div className="App">
        <Switch>
          <Route path="/" exact component={Frontpage} />
          <Route path="/app" exact component={Homepage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
