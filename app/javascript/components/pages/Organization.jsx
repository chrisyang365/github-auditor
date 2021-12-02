import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Card, Dimmer, Header, Image, Loader, Label, Icon } from 'semantic-ui-react'
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
            const orgsData = await axios.get("https://api.github.com/user/orgs", {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            });

            const orgData = []
            for (const org of orgsData.data) {
                const res = await axios.get(`https://api.github.com/orgs/${org.login}`, {
                    headers: {
                        'Authorization': `token ${access_token}`
                    }
                })
                orgData.push({...org, twoFA: res.data.two_factor_requirement_enabled})
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
                                    {orgData.map((org) => {
                                        return (
                                            <Card 
                                                link
                                                onClick={(event,data) => {
                                                    setClickedOrg(org);
                                                    setRedirect(true);
                                                }}
                                                // to={'/orgs/' + org.login + '/repos'}
                                            >
                                                {/* <Image src={org.avatar_url} wrapped ui={false} /> */}
                                                <Card.Content>
                                                    <Label image size='large' style={{ marginBottom: "1em" }}><Image style={{ marginTop: "0.25em", marginBottom: "0.25em" }} src={org.avatar_url} />{org.name ? org.name : org.login}</Label>
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
                                        <Card.Content>
                                            <Label image size='large' style={{ marginBottom: "1em" }}><Image style={{ marginTop: "0.25em", marginBottom: "0.25em" }} src={plusminus} />Manage Organization Access</Label>
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