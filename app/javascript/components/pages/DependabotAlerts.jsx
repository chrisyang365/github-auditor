import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Link, useLocation } from "react-router-dom";
import { Card, Dimmer, Header, Image, Loader, List, Item } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar"

export default function DependabotAlerts(props) {

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dependabotAlertsData, setDependabotAlertsData] = useState([]);
    const location = useLocation()

    useEffect(() => {
        if (!isLoaded && state.isLoggedIn) {
            props.history.push()
            let pathArr = location.pathname
                        .split('/')
                        .filter(name => name.length > 0)
            pathArr.splice(2, 1)
            pathArr.splice(0, 1)
            const [orgName, repoName] = pathArr
            const access_token = state.user.access_token;
            const url = "/api/orgs/" +
                     orgName + "/repos/" + 
                     repoName + "/dependabotalerts";
            axios.get(url, {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            })
            .then((res) => {
                console.log(res.data)
                setDependabotAlertsData(res.data['dependabot_alerts']);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
            })
        }
    }, [isLoaded, dependabotAlertsData])

    return (
        <div>
            {state.isLoggedIn ? (
            <>
            <NavBar />
                {isLoaded ? (
                    <>
                        {dependabotAlertsData.length > 0 ? (
                            <Item.Group style={{padding: 20 + 'px'}}>
                                {dependabotAlertsData
                                .sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                                .map((dependabotAlert) => {
                                    return (
                                        <Item>
                                            <Item.Content>
                                                <Item.Header>{dependabotAlert.name}</Item.Header>
                                                <Item.Description>
                                                    {dependabotAlert.description}
                                                    <ul>
                                                        <li>Severity: {dependabotAlert.severity}</li>
                                                        <li>Status: {dependabotAlert.status}</li>
                                                        <li>Created at: {dependabotAlert.created_at}</li>
                                                        <li>Updated at: {dependabotAlert.updated_at}</li>
                                                    </ul>
                                                </Item.Description>
                                            </Item.Content>
                                        </Item>
                                    )
                                })}
                            </Item.Group>
                        ) : (
                            <Header as='h2' textAlign='center' disabled>
                                No dependabot alerts are associated with this repository.
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