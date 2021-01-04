import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import CardState from "./context/card/cardState";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import { Alert } from "./components/layout/Alert";
import { NotFound } from "./components/pages/NotFound";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import setToken from "./utils/setToken";

if (localStorage.token) {
  setToken(localStorage.token);
}
const App = () => {
  return (
    <div className="App">
      <AuthState>
        <CardState>
          <AlertState>
            <Router>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Router>
          </AlertState>
        </CardState>
      </AuthState>
    </div>
  );
};

export default App;
