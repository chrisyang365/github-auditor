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
    const location = useLocation();

    useEffect(() => {
        if (!isLoaded && state.isLoggedIn) {
            const orgName = location.pathname
                            .split('/')
                            .filter(name => name.length > 0)[1];
            const access_token = state.user.access_token;
            const url = "/api/orgs/" + orgName + "/repos";
            axios.get(url, {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            })
            .then((res) => {
                setRepoData(res.data['repositories']);
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
                            "/" + clickedRepo
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
                                        let repoDisplayName = repo.name.split('/')[1]
                                        return (
                                            <Card 
                                                link
                                                onClick={(event,data) => {
                                                    setClickedRepo(repoDisplayName);
                                                    setRedirect(true);
                                                }}
                                                // to={'/orgs/' + repo.owner.login + '/repos/' + repo.name}
                                            >
                                                <Card.Content>
                                                    <Card.Header>{repoDisplayName}</Card.Header>
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