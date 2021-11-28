import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Link, useLocation } from "react-router-dom";
import { Card, Dimmer, Header, Image, Loader } from 'semantic-ui-react'
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
    const { orgName } = location.state

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