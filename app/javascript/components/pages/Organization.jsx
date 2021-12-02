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
                // uncomment
                //orgData.push({...org, name: res.data.name, twoFA: res.data.two_factor_requirement_enabled})
                // hard code for DEMO-- remove later
                switch (org.login) {
                    case 'Xenon-UCSB':
                        orgData.push({ ...org, twoFA: true, noOutsideContribs: true, dependabot: false, PRsHaveReviewers: true, freeOfSensitive: true });
                        break;
                    case 'cs-189a-test-organization-1':
                        orgData.push({ ...org, twoFA: true, noOutsideContribs: false, dependabot: false, PRsHaveReviewers: true, freeOfSensitive: false });
                        break;
                    case 'cs-189a-test-organization-2':
                        orgData.push({ ...org, twoFA: false, noOutsideContribs: true, dependabot: true, PRsHaveReviewers: true, freeOfSensitive: true });
                        break;
                    case 'cs-189a-test-organization-3':
                        orgData.push({ ...org, twoFA: true, noOutsideContribs: true, dependabot: false, PRsHaveReviewers: false, freeOfSensitive: true });
                        break;
                    case 'cs-189a-test-organization-4':
                        orgData.push({ ...org, twoFA: true, noOutsideContribs: false, dependabot: true, PRsHaveReviewers: true, freeOfSensitive: true });
                        break;
                    case 'cs-189a-test-organization-5':
                        orgData.push({ ...org, twoFA: false, noOutsideContribs: false, dependabot: false, PRsHaveReviewers: false, freeOfSensitive: false });
                        break;
                    default:

                }
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
                                                                    <Icon color={getIconColor(org.twoFA)} name={getIconName(org.twoFA)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                No Outside Contributors
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.noOutsideContribs)} name={getIconName(org.noOutsideContribs)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                Dependabot Alerts
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.dependabot)} name={getIconName(org.dependabot)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                All PRs Have Reviewers
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.PRsHaveReviewers)} name={getIconName(org.PRsHaveReviewers)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                Free of Sensitive Info
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.freeOfSensitive)} name={getIconName(org.freeOfSensitive)} />
                                                                </Label.Detail>
                                                            </Label>
                                                        </Label.Group>
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        )
                                    })}
                                    <Card link href={`https://github.com/settings/connections/applications/${state.client_id}`} target="_blank">
                                        <Card.Content>
                                            <Label image size='large' style={{ marginBottom: "1em" }}><Image  style={{ marginLeft: "0.25em", marginTop: "0.25em", marginBottom: "0.25em" }} src={plusminus} />Manage Organization Access</Label>
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