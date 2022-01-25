import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Card, Dimmer, Header, Icon, Image, Loader } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";
import plusminus from "../../../assets/images/plusminus.png";

export default function Organization(){

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orgData, setOrgData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [clickedOrg, setClickedOrg] = useState(null);

    useEffect(() => {
        if (!isLoaded && state.isLoggedIn) {
            const access_token = state.user.access_token;
            axios.get("/api/orgs", {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            })
            .then((res) => {
                setOrgData(res.data);
                setIsLoaded(true);
            })
        }
    }, [isLoaded, orgData])

    return(
        <div>
            {redirect ? (
                <Redirect to={{
                    pathname: '/orgs/' + clickedOrg.name + '/repos',
                    state: { orgName: clickedOrg.name }
                }}/>
            ) : (
                <>
                {state.isLoggedIn ? (
                <>
                <NavBar />
                    {isLoaded ? (
                        <>
                            {orgData.length > 0 ? (
                                <Card.Group centered>
                                    {orgData.map((org, index) => {
                                        return (
                                            <Card 
                                                link
                                                onClick={(event,data) => {
                                                    setClickedOrg(org);
                                                    setRedirect(true);
                                                }}
                                                // to={'/orgs/' + org.login + '/repos'}
                                                key={index}
                                            >
                                                <Image src={org.avatar_url} wrapped ui={false} />
                                                <Card.Content>
                                                    <Card.Header>{org.name}</Card.Header>
                                                    <Card.Description>
                                                        {org.two_factor_requirement_enabled === true ? (
                                                            <p style={{ color: "green"}}>Two-factor Authentication is enabled</p>
                                                        ) : (
                                                            <p style={{ color: "red"}}>Two-factor Authentication is not enabled</p>
                                                        )}
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        )
                                    })}
                                    <Card link href={`https://github.com/settings/connections/applications/${state.client_id}`} target="_blank">
                                        <Image src={plusminus} wrapped ui={false} />
                                        <Card.Content>
                                            <Card.Header>
                                                Manage organizations access
                                            </Card.Header>
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
                </>
            )}
        </div>
    )
}