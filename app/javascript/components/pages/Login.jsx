import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import GithubButton from 'react-github-login-button';
import { Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        code: newUrl[1]
      };

      const proxy_url = state.proxy_url;

      // Use code parameter and other parameters to make POST request to proxy_server
      axios.post(proxy_url, requestData)
        .then((res) => {
          dispatch({
            type: "LOGIN",
            payload: { user: res.data, isLoggedIn: true }
          });
        })
        .catch((error) => {
          setData({
            isLoading: false,
            errorMessage: "Sorry! Login failed"
          });
        })
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {data.isLoading ? (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        <div>
          <h1>Login Page</h1>
          <span>{data.errorMessage}</span>
            
          <>
            {
              // Link to request GitHub access
            }
            <a
              className="login-link"
              href={`https://github.com/login/oauth/authorize?scope=user%20admin:org%20security_events%20repo%20admin:org_hook&client_id=${client_id}&redirect_uri=${redirect_uri}`}
              onClick={() => {
                setData({ ...data, errorMessage: "" });
              }}
            >
              <GithubButton type="dark" />
            </a>
          </>
        </div>
      )}
    </div>
  );
}