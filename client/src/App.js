import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import CardState from "./context/card/cardState";

const App = () => {
  return (
    <div className="App">
      <CardState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Router>
      </CardState>
    </div>
  );
};

export default App;
