import logo from "./assets/logo.png";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/pages/Home'
import Category from './components/pages/Category'
import Product from './components/pages/Product'
import History from './components/pages/History'
import Detail from './components/pages/Detail'
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <ul>
            <li>Home</li>
            <li>Contato</li>
          </ul>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/">
              <Category />
            </Route>
            <Route exact path="/">
              <Product />
            </Route>
            <Route exact path="/">
              <History />
            </Route>
            <Route exact path="/">
              <Detail />
            </Route>
          </Switch>

          <img className="logo" src={logo}></img>
        </div>
      </Router>
    </>
  );
}

export default App;
