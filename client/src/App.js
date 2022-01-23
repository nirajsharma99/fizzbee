import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './components/homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frontpage from './components/frontpage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Frontpage} />
          <Route path="/app">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
