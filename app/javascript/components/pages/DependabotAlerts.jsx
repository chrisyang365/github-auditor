import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Link, useLocation } from "react-router-dom";
import { Card, Dimmer, Header, Image, Loader, List, Item } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar"

export default function DependabotAlerts(props) {

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dependabotAlertsData, setDependabotAlertsData] = useState({});
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
                const severity_count = {}
                for (let i = 0; i < res.data['dependabot_alerts'].length; i++)  {
                    const alert = res.data['dependabot_alerts'][i]
                    if (!(alert.severity in severity_count)) {
                        severity_count[alert.severity] = 0
                    }
                    severity_count[alert.severity] += 1
                }
                setDependabotAlertsData(severity_count);
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
                        {Object.keys(dependabotAlertsData).length > 0 ? (
                            <Item.Group style={{padding: 20 + 'px'}}>
                                {Object.keys(dependabotAlertsData).map((severity) => {
                                    return (
                                        <Item>
                                            <Item.Content>
                                                <Item.Header>{severity}</Item.Header>
                                                <Item.Description>
                                                    {dependabotAlertsData[severity]}
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