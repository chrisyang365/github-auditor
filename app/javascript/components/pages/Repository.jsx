import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Link, useLocation } from "react-router-dom";
import { Card, Dimmer, Header, Image, Loader, List, Button } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar"

export default function Repositories(props){

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [repoData, setRepoData] = useState([]);
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
            const url = "https://api.github.com/repos/" +
                     orgName + "/" + repoName;
            axios.get(url, {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            })
            .then((res) => {
                console.log(res.data)
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
            {state.isLoggedIn ? (
            <>
            <NavBar />
                {isLoaded ? (
                    <div style={{padding: 20 + "px"}}>
                        <h1>Title: {repoData.name}</h1>
                        <body>Description: {repoData.description}</body>
                        <ul>
                            <li>Permissions: </li>
                            <ul>
                                <li>admin: {repoData.permissions.admin.toString()}</li>
                                <li>maintain: {repoData.permissions.maintain.toString()}</li>
                                <li>pull: {repoData.permissions.pull.toString()}</li>
                                <li>push: {repoData.permissions.push.toString()}</li>
                                <li>triage: {repoData.permissions.triage.toString()}</li>
                            </ul>
                            <li>Private: {repoData.private.toString()}</li>
                            <li>LastEdited: {repoData.updated_at}</li>
                            <li>Open issues: {repoData.open_issues}</li>
                            {/* Add other necessary stuff for demo and make it look better */}
                        </ul>
                        <Button
                            as={Link}
                            content='Dependabot alerts'
                            icon='right arrow'
                            labelPosition='right' 
                            to={location.pathname + '/dependabotalerts'}
                        />
                        <br></br>
                        <br></br>
                        <Button
                            as={Link}
                            content='Code alerts'
                            icon='right arrow'
                            labelPosition='right' 
                            to={location.pathname + '/codealerts'}
                        />
                    </div>
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