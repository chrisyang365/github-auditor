import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Link, useLocation } from "react-router-dom";
import { Card, Dimmer, Header, Image, Loader, List, Item } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar"

export default function CodeAlerts(props) {

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [codeAlertsData, setCodeAlertsData] = useState([]);
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
                     repoName + "/codealerts";
            axios.get(url, {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            })
            .then((res) => {
                console.log(res.data)
                setCodeAlertsData(res.data['code_alerts']);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
            })
        }
    }, [isLoaded, codeAlertsData])

    return (
        <div>
            {state.isLoggedIn ? (
            <>
            <NavBar />
                {isLoaded ? (
                    <>
                        {codeAlertsData.length > 0 ? (
                            <Item.Group style={{padding: 20 + 'px'}}>
                                {codeAlertsData
                                .sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
                                .map((codeAlert) => {
                                    return (
                                        <Item>
                                            <Item.Content>
                                                <Item.Header>{codeAlert.name}</Item.Header>
                                                <Item.Description>
                                                    {codeAlert.description}
                                                    <ul>
                                                        <li>Severity: {codeAlert.severity}</li>
                                                        <li>Status: {codeAlert.status}</li>
                                                        <li>Created at: {codeAlert.created_at}</li>
                                                        <li>Updated at: {codeAlert.updated_at}</li>
                                                    </ul>
                                                </Item.Description>
                                            </Item.Content>
                                        </Item>
                                    )
                                })}
                            </Item.Group>
                        ) : (
                            <Header as='h2' textAlign='center' disabled>
                                No code alerts are associated with this repository.
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