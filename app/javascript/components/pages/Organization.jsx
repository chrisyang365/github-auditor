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
        const access_token = state.user.access_token;
        const fetchData = async () => {
            const orgsData = await axios.get("/api/orgs", {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            });

            const orgData = [];
            for (const org of orgsData.data.organizations) {
                orgData.push({ ...org, twoFA: org.two_factor_requirement_enabled });
            }
            setOrgData(orgData);
            setIsLoaded(true);
        };
        if (!isLoaded && state.isLoggedIn) {
            fetchData();
        }
    }, [isLoaded, orgData])

    return(
        <div>
            {redirect ? (
                <Redirect to={{
                    pathname: '/orgs/' + clickedOrg.login + '/repos',
                    state: { orgName: clickedOrg.login }
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
                                                    <Card.Header>{org.login}</Card.Header>
                                                    <Card.Description>
                                                        {org.twoFA === true ? (
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