import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";
import Lottie from 'react-lottie';
import animationData from '../../lotties/code-security.json';
import { Container, Grid, Header, Segment, Image } from 'semantic-ui-react';
import dependabot from "../images/dependabot.png";
import codeScan from "../images/code-scan.png";
import secretScan from "../images/secret-scan.png";

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
    <>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '5em' }}>
                Your GitHub Security Dashboard
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Easily view security vulnerabilities from all of your GitHub organizations at a single glance.
                No more navigating through each organization's individually on GitHub!
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Lottie options={defaultOptions} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment inverted style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header inverted as='h3' style={{ fontSize: '3em' }}>
            How it Works
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            The very first time you login, our app will look through
            all the repositories nested underneath all the organizations
            you granted the app access to, and consolidate all the
            various security concerns that were found, such as unresolved
            Dependabot Alerts, code scan alerts, or exposed API keys.
            <br />
            <br />
            In order to keep our app up to date with the current state
            of your organizations, our app will also automatically
            create webhooks for each of your organizations, so that
            if there is ever a new security concern (i.e. new Dependabot Alert
            is created, or an API is commited and pushed), our app will
            be aware of these changes and make the necessary updates.
            <br />
            <br />
            Furthermore, if a new security incident ever occurs, our app
            will notify all the relevant stakeholders via email, so that
            you don't have to constantly check the app for new updates.
          </p>
        </Container>
      </Segment>
      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em', paddingBottom: '3em' }}>
                Code Scan Alerts
              </Header>
              <Image centered src={codeScan} />
              <p style={{ fontSize: '1.33em', padding: '5em' }}>
              Tokens and private keys are examples of secrets that a service provider can issue.
              If you check a secret into a repository, anyone who has read access to the repository
              can use the secret to access the external service with your privileges. Secret scanning
              will scan your entire Git history on all branches present in your GitHub repository for
              any secrets.</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em', paddingBottom: '3em' }}>
                Dependabot Alerts
              </Header>
              <Image centered src={dependabot} />
              <p style={{ fontSize: '1.33em', padding: '5em' }}>Dependabot alerts are created when
              GitHub detects that your codebase is using dependencies with known vulnerabilities.
              For repositories where Dependabot security updates are enabled, when GitHub
              detects a vulnerable dependency in the default branch, Dependabot creates a
              pull request to fix it</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em', paddingBottom: '3em' }}>
                Secret Scan Alerts
              </Header>
              <Image centered src={secretScan} />
              <p style={{ fontSize: '1.33em', padding: '5em' }}>Code scanning is a feature that you
              use to analyze the code in a GitHub repository to find security vulnerabilities and coding
              errors. Any problems identified by the analysis are shown in GitHub.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment inverted style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header inverted as='h3' style={{ fontSize: '3em' }}>
            How to View Your Audited Organizations
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Click on the organizations tab displayed at the top of the screen. From there,
            you can see all of the organizations that you are apart of, and you can then click
            on each organization and check if any vulnerabilities were detected in your organizations' repositories.
          </p>
        </Container>
      </Segment>
    </>
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