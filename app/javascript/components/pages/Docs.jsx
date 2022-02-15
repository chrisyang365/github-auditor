import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";

export default function Docs(props) {
    const { state } = useContext(AuthContext);

    return (
        <div>
            {state.isLoggedIn ? (
                <>
                    <NavBar />
                    <div style={{padding: 20 + 'px'}}>
                        <h1>Welcome to the documentation!</h1>
                        <br/>
                        <h2>Auditing GitHub Organizations:</h2>
                        <h3>
                            To audit GitHub organizations, go to the organizations 
                            tab displayed at the top of the screen. From this screen,
                            we can see all of the organizations that you are apart of.
                            You can then click on each organization and look into the
                            vulnerabilities such as API key or dependabot alerts.
                        </h3>
                    </div>
                </>
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    )
}