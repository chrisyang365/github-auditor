import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "./App";

function Homepage() {
    const { state, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }

    return (
        <div>
            {state.isLoggedIn ? (
                <div>
                    <h1>Welcome {state.user.username}!</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    )
}

export default Homepage;