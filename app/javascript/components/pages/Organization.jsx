import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect, useLocation } from "react-router-dom";
import { Card, Dimmer, Header, Icon, Image, Loader } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";
import plusminus from "../../../assets/images/plusminus.png";
import './Organization.css';

export default function Organization(){

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orgData, setOrgData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [clickedOrg, setClickedOrg] = useState(null);
    const [searchTerm, setSearchState] = useState("");
    const location = useLocation();

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
            {!location.pathname.includes('orgs') ? (
                <Redirect to={'/orgs'} />
            ) : redirect ? (
                <Redirect to={{
                    pathname: '/orgs/' + clickedOrg.name + '/repos',
                    state: { orgName: clickedOrg.name, org: clickedOrg }
                }}/>
            ) : (
                <>
                {state.isLoggedIn ? (
                <>
                <NavBar />
                    {isLoaded ? (
                        <>  
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <input 
                                    type = "text" 
                                    style={{marginBottom:"15px",
                                        height:"50px",
                                        width: "300px",
                                        borderRadius: "5px",
                                        paddingLeft: "10px",
                                        fontSize: "20px"}} 
                                    placeholder="Search for org..." 
                                    onChange={event => {setSearchState(event.target.value);
                                    }}
                                />
                            </div>
                            {orgData.length > 0 ? (
                                <Card.Group centered>
                                    {orgData.filter((org)=> {
                                        if (searchTerm == ""){
                                            return org
                                        } else if (org.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                            return org
                                        }
                                    }).map((org, index) => {
                                        const getIconColor = enabled => enabled ? 'green' : 'red'
                                        const getIconName = enabled => enabled ? 'check' : 'x'
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
                                                {/* <Image src={org.avatar_url} wrapped ui={false} /> */}
                                                <Card.Content>
                                                    <Label image size='large' color='black' style={{ marginBottom: "1em" }}>
                                                        <Image avatar style={{ marginLeft: "0.25em", marginTop: "0.25em", marginBottom: "0.25em" }} src={org.avatar_url} />{org.name ? org.name : org.login}
                                                    </Label>
                                                    <Card.Description>
                                                        <Label.Group size='medium'>
                                                            <Label>
                                                                2FA Requirement
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.two_factor_requirement_enabled)} name={getIconName(org.two_factor_requirement_enabled)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            {/* <Label>
                                                                No Outside Contributors
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.issues.noOutsideContribs)} name={getIconName(org.issues.noOutsideContribs)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                Dependabot Alerts
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.issues.dependabot)} name={getIconName(org.issues.dependabot)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                All PRs Have Reviewers
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.issues.PRsHaveReviewers)} name={getIconName(org.issues.PRsHaveReviewers)} />
                                                                </Label.Detail>
                                                            </Label> */}
                                                            <Label>
                                                                Free of Code Alerts
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(!org.code_alerts_exist)} name={getIconName(!org.code_alerts_exist)} />
                                                                </Label.Detail>
                                                            </Label>
                                                        </Label.Group>
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        )
                                    })}
                                    <Card link href={`https://github.com/settings/connections/applications/${state.client_id}`} target="_blank" rel="noreferrer noopener">
                                        <Card.Content>
                                            <Label image size='large' style={{ marginBottom: "1em" }}><Image  style={{ padding: "0.25em" }} src={plusminus} />Manage Organization Access</Label>
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