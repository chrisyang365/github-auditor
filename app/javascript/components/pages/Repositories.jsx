import React, { useEffect, useState, useContext } from 'react';
import { Redirect, Link, useLocation } from "react-router-dom";
import { Button, Card, Dimmer, Header, Icon, Label, Loader } from 'semantic-ui-react'
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
                setRepoData(res.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
            })
        }
    }, [isLoaded, repoData])

    const getDependabotAlertCategories = (alerts) => {
        const severity_count = {'LOW': 0, 'MODERATE': 0, 'HIGH': 0, 'CRITICAL': 0}
        for (let i = 0; i < alerts.length; i++)  {
            const alert = alerts[i]
            severity_count[alert.severity] += 1
        }
        console.log(severity_count)
        return severity_count
    }

    const getSeverityColor = (severity) => {
        const severity_to_color = {'LOW': 'gray', 'MODERATE': '#d29922', 'HIGH': '#db6d28', 'CRITICAL': '#f85149'}
        return severity_to_color[severity]
    }

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
                                                // onClick={(event,data) => {
                                                //     setClickedRepo(repoDisplayName);
                                                //     setRedirect(true);
                                                // }}
                                            >
                                                <Card.Content>
                                                    <Card.Header>{repoDisplayName}</Card.Header>
                                                    <Card.Description>
                                                        <Label.Group size="medium">
                                                            {repo.dependabot_alerts.length > 0 ? (
                                                                <Label as="a" href={"https://github.com/" + repo.name + "/security/dependabot"} name={repo.name} onClick={(e, data) => {
                                                                    console.log(data)
                                                                }}>
                                                                    Pending Dependabot Alerts:
                                                                    <div style={{display: "flex"}}>
                                                                    {Object.entries(getDependabotAlertCategories(repo.dependabot_alerts)).map((alert) => {
                                                                        return (
                                                                            <p className="pull-left" style={{color: getSeverityColor(alert[0])}}>{alert[0]}: {alert[1]}</p>
                                                                        )
                                                                    })}
                                                                    </div>
                                                                </Label>
                                                            ) : (
                                                                <Label>
                                                                    Free of Dependabot Alerts
                                                                    <Label.Detail>
                                                                        <Icon color="green" name="check" />
                                                                    </Label.Detail>
                                                                </Label>
                                                            )}
                                                            {repo.code_alerts.length > 0 ? (
                                                                <></>
                                                            ) : (
                                                                <Label>
                                                                    Free of Code Alerts
                                                                    <Label.Detail>
                                                                        <Icon color="green" name="check" />
                                                                    </Label.Detail>
                                                                </Label>
                                                            )}
                                                            <Label.Detail>

                                                            </Label.Detail>
                                                        </Label.Group>
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