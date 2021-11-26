import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from "react-router-dom";
import { Card, Dimmer, Header, Image, Loader } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar"

export default function Organization(){

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orgData, setOrgData] = useState([]);

    useEffect(() => {
        if (!isLoaded && state.isLoggedIn) {
            const access_token = state.user.access_token;
            axios.get("https://api.github.com/user/orgs", {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            })
            .then((res) => {
                setOrgData(res.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
            })
        }
    }, [isLoaded, orgData])

    return(
        <div>
            {state.isLoggedIn ? (
            <>
            <NavBar />
                {isLoaded ? (
                    <>
                        {orgData.length > 0 ? (
                            <Card.Group centered>
                                {orgData.map((org) => {
                                    return (
                                        <Card link>
                                            <Image src={org.avatar_url} wrapped ui={false} />
                                            <Card.Content>
                                                <Card.Header>{org.login}</Card.Header>
                                                <Card.Description>
                                                    {org.description}
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    )
                                })}
                                <Card link href={`https://github.com/settings/connections/applications/${state.client_id}`} target="_blank">
                                    <Card.Content>
                                        <Card.Header>larry</Card.Header>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        ) : (
                            <Header as='h2' textAlign='center' disabled>
                                No authorized GitHub organizations are associated with this account.
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
        </div>

    )
}