import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import {
  Button, Container, Header, Icon,
  Segment, Dimmer, Loader
} from 'semantic-ui-react';
import axios from 'axios';
import NavBar from "../layout/NavBar";

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

  // from Semantic UI example https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/HomepageLayout.js
  const HomepageHeading = () => (
    <Container text>
      <Header
        as='h1'
        content='GitHub Auditor'
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as='h2'
        content='Audit your organizations at a glance.'
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <a
        className="login-link"
        href={`https://github.com/login/oauth/authorize?scope=user%20admin:org%20security_events%20repo%20admin:org_hook&client_id=${client_id}&redirect_uri=${redirect_uri}`}
        onClick={() => {
          setData({ ...data, errorMessage: "" });
        }}
      >
        <Button secondary size='huge'>
          <Icon name='github' />
          Log in with GitHub
        </Button>
      </a>
    </Container>
  )

  if (state.isLoggedIn) {
    return <Redirect to="/docs" />;
  }

  return (
    <div>
      <NavBar />
      {data.isLoading ? (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        <Segment

          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        >
          <HomepageHeading />
        </Segment>
      )}
    </div>
  );
}