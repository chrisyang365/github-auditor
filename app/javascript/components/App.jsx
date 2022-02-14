import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Organization from "./pages/Organization"
import Repositories from './pages/Repositories';
import Repository from './pages/Repository';
import DependabotAlerts from './pages/DependabotAlerts';
import Docs from './pages/Docs'
import { initialState, reducer } from "../store/reducer";
import NavBar from './layout/NavBar';


export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <Router>
        <Switch>
          <Route path="/docs" exact component={Docs}/>
          <Route path="/" exact component={Organization}/>
          <Route path="/orgs" exact component={Organization}/>
          <Route path="/orgs/:name/repos" exact component={Repositories}/>
          <Route path="/orgs/:name/repos/:repo" exact component={Repository}/>
          <Route path="/orgs/:name/repos/:repo/dependabotalerts" exact component={DependabotAlerts}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;