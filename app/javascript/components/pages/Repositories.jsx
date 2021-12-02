import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Link, useLocation } from "react-router-dom";
import { Card, Dimmer, Header, Image, Loader, Message, Icon } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar"

export default function Repositories(props){

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [repoData, setRepoData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [clickedRepo, setClickedRepo] = useState(null);
    const location = useLocation()
    const { orgName, org } = location.state
    const issueMessages = Object.entries(org.issues).map(obj => {
        const issueKey = obj[0];
        const issueValue = obj[1];
        if (issueValue) {
            return null;
        }
        else {
            switch (issueKey) {
                case 'twoFA':
                    return <Message.Item>The <a href={`https://github.com/organizations/${orgName}/settings/security`} target="_blank" rel="noreferrer noopener">two-factor authentication requirement</a> is not enabled.</Message.Item>;
                case 'noOutsideContribs':
                    return <Message.Item content="The organization has outside contributors." />;
                case 'dependabot':
                    return <Message.Item content="There are Dependabot alerts." />;
                case 'PRsHaveReviewers':
                    return <Message.Item content="One or more pull requests lack assigned reviewers." />;
                case 'freeOfSensitive':
                    return <Message.Item content="Sensitive information was detected in the code." />;
                default:
                    return null;
            }
        }
    })

    useEffect(() => {
        if (!isLoaded && state.isLoggedIn) {
            const access_token = state.user.access_token;
            const url = "https://api.github.com/orgs/" 
                + orgName + "/repos";
            axios.get(url, {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            })
            .then((res) => {
                setRepoData(res.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
            })
        }
    }, [isLoaded, repoData])

    return(
        <div>
            {redirect ? (
                <Redirect to={{
                    pathname: props.location.pathname + 
                            "/" + clickedRepo.name,
                    state: {
                        repoName: clickedRepo.name,
                        orgName: orgName
                    }
                }}/>
            ) : (
            <>
                {state.isLoggedIn ? (
                <>
                <NavBar />
                    {isLoaded ? (
                        <>
                        {/* { Object.keys(org.issues).forEach(k => {
                            if (org.issues[k]) {
                                switch (k) {
                                    case 'twoFA':
                                        <> */}
                                        <Message warning>
                                            <Message.Header>
                                                <Icon name='warning sign' />
                                                The organization {orgName} has the following security issues:
                                            </Message.Header>
                                            <Message.List>
                                                {issueMessages.map(i => i ? i : null)}
                                            </Message.List>
                                        </Message>
                                        {/* </>
                                }
                            }
                        })

                        } */}
                            {repoData.length > 0 ? (
                                <Card.Group centered>
                                    {repoData
                                    .sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                                    .map((repo) => {
                                        return (
                                            <Card 
                                                link
                                                onClick={(event,data) => {
                                                    setClickedRepo(repo);
                                                    setRedirect(true);
                                                }}
                                                // to={'/orgs/' + repo.owner.login + '/repos/' + repo.name}
                                            >
                                                <Card.Content>
                                                    <Card.Header>{repo.name}</Card.Header>
                                                    <Card.Description>
                                                        {repo.description ? repo.description : ""}
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        )
                                    })}
                                </Card.Group>
                            ) : (
                                <Header as='h2' textAlign='center' disabled>
                                    No authorized GitHub repositories are associated with this organization.
                                </Header>
                            )}
                        </>
                    ) : (
                        <Dimmer active>
                            <Loader>Loading</Loader>
                        </Dimmer>
                    )}
                </>
                ) : (
                    <Redirect to="/login" />
                )}
            </>
            )}
        </div>
    )
}