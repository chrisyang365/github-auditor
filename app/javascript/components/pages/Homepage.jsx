import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";
import { Container, Header, Segment } from 'semantic-ui-react';

function Homepage(props) {
    const { state } = useContext(AuthContext);

    // from Semantic UI example https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/layouts/HomepageLayout.js
    const HomepageHeading = () => (
        <Container text>
            <Header
                as='h1'
                content={`Welcome ${state.user.username}!`}
                style={{
                    fontSize: '3em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                }}
            />
        </Container>
    )

    return (
        <div>
            {state.isLoggedIn ? (
                <>
                    <NavBar />
                    <Segment
                        textAlign='center'
                        style={{ minHeight: 700, padding: '1em 0em' }}
                        vertical
                    >
                        <HomepageHeading />
                    </Segment>

                </>
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    )
}

export default Homepage;