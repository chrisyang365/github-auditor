import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";
import Lottie from 'react-lottie';
import animationData from '../../lotties/code-security.json';
import { Header } from 'semantic-ui-react';

export default function Docs(props) {
    const { state } = useContext(AuthContext);
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div>
        {state.isLoggedIn ? (
            <>
                <NavBar />
                <div style={{justifyContent: "center", display: "flex", padding: 20 + 'px'}}>
                    <Header
                      as="h1"
                      style={{
                        fontSize: '6em',
                        fontWeight: 'normal',
                        width: '5em',
                        marginLeft: '3em',
                        marginTop: '1em',
                      }}
                      content="Security dashboard for GitHub Organizations"/>
                  <Lottie
                      style={{
                        marginLeft: "20em"
                      }}
                      options={defaultOptions}
                      height={600}
                      width={600}
                  />
                </div>

            </>
        ) : (
            <Redirect to="/login" />
        )}
    </div>
    )
}