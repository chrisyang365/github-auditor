import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";

function Homepage(props) {
    const { state } = useContext(AuthContext);

    return (
        <div>
            {state.isLoggedIn ? (
                <>
                    <NavBar />
                    <h1>Welcome {state.user.username}!</h1>

                </>
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    )
}

export default Homepage;