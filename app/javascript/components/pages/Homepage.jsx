import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";

function Homepage(props) {
    const { state } = useContext(AuthContext);

    return (
        <div>
            <Redirect to={state.isLoggedIn ? "/orgs" : "/login"} />
        </div>
    )
}

export default Homepage;