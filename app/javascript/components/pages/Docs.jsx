import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";
import Lottie from 'react-lottie';
import animationData from '../../lotties/code-security.json';
import { Grid, Header, Segment } from 'semantic-ui-react';

export default function Docs(props) {
  const { state } = useContext(AuthContext);
  const animationString = JSON.stringify(animationData);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: JSON.parse(animationString),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true
    }
  };
  // from Semantic UI example https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/HomepageLayout.js
  const HomepageLayout = () => (
    <Segment style={{ padding: '1em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Your GitHub Security Dashboard
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Easily view security vulnerabilities from all of your GitHub organizations at a single glance.
              No more navigating through each organization's individually on GitHub!
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              How to Audit Your Organizations
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              To audit GitHub organizations, go to the organizations
              tab displayed at the top of the screen. From this screen,
              we can see all of the organizations that you are apart of.
              You can then click on each organization and look into the
              vulnerabilities such as API key or dependabot alerts.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Lottie options={defaultOptions} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )

  return (
    <div>
      {state.isLoggedIn ? (
        <>
          <NavBar />
          <HomepageLayout />

        </>
      ) : (
        <Redirect to="/login" />
      )}
  </div>
  )
}