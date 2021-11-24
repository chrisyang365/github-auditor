import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Organization from "./pages/Organization"
import { initialState, reducer } from "../store/reducer";


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
        <Route path="/orgs" component={Organization}/>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Homepage}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;