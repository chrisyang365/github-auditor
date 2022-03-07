import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect, useLocation } from "react-router-dom";
import { Card, Dimmer, Header, Icon, Image, Loader, Label, Popup } from 'semantic-ui-react'
import axios from 'axios';
import { AuthContext } from "../App";
import NavBar from "../layout/NavBar";
import SearchBar from "../layout/SearchBar";
import FilterDrop from "../layout/FilterDrop";
import plusminus from "../../../assets/images/plusminus.png";

export default function Organization(){

    const { state, dispatch } = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [orgData, setOrgData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [clickedOrg, setClickedOrg] = useState(null);
    const [searchTerm, setSearchState] = useState("");
    const [filters, setFilter] = useState({'H2FA':false,'N2FA':false,'HDEP':false,'NDEP':false,'HCODE':false,'NCODE':false,'HSEC':false,'NSEC':false});
    const [filtersLen, setFilterLen] = useState(8);
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
                        <>  <div style={{display:"flex", justifyContent:"center"}}>
                            <SearchBar setSearchState={setSearchState}/>
                            <FilterDrop filtersLen={filtersLen} filters={filters} setFilter={setFilter}/>
                            </div>
                            {orgData.length > 0 ? (
                                <Card.Group centered>
                                    {orgData.filter((org)=> {
                                        const hasFilter = Object.values(filters).includes(true);
                                        let filtered = true;
                                        if (hasFilter) {
                                            if (filters["H2FA"] === true && filters["N2FA"] === false) {
                                                if (org.two_factor_requirement_enabled === false) {
                                                    filtered = false
                                                }
                                            }
                                            if (filters["N2FA"] === true && filters["H2FA"] === false) {
                                                if (org.two_factor_requirement_enabled === true) {
                                                    filtered = false
                                                }
                                            }
                                            if (filters["HDEP"] === true && filters["NDEP"] === false) {
                                                if (org.dependabot_alerts_exist === false) {
                                                    filtered = false
                                                }
                                            }
                                            if (filters["NDEP"] === true && filters["HDEP"] === false) {
                                                if (org.dependabot_alerts_exist === true) {
                                                    filtered = false
                                                }
                                            }
                                            if (filters["HCODE"] === true && filters["NCODE"] === false) {
                                                if (org.code_alerts_exist === false) {
                                                    filtered = false
                                                }
                                            }
                                            if (filters["NCODE"] === true && filters["HCODE"] === false) {
                                                if (org.code_alerts_exist === true) {
                                                    filtered = false
                                                }
                                            }
                                            if (filters["HSEC"] === true && filters["NSEC"] === false) {
                                                if (org.secret_alerts_exist === false) {
                                                    filtered = false
                                                }
                                            }
                                            if (filters["NSEC"] === true && filters["HSEC"] === false) {
                                                if (org.secret_alerts_exist === true) {
                                                    filtered = false
                                                }
                                            } 
                                        }
                                        if (org.name.toLowerCase().includes(searchTerm.toLowerCase()) && filtered) {
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
                                                key={index}
                                            >
                                                <Card.Content>
                                                    <Label image size='large' color='black' style={{ marginBottom: "1em" }}>
                                                        <Image avatar style={{ marginLeft: "0.25em", marginTop: "0.25em", marginBottom: "0.25em" }} src={org.avatar_url} />{org.name ? org.name : org.login}
                                                    </Label>
                                                    <Card.Meta>
                                                        Billing plan: {org.billing_plan}
                                                        {org.billing_plan !== 'enterprise' ? (
                                                            <Popup content='We can not audit for secret scan alerts for non-enterprise organizations' trigger={<Icon color='yellow' style={{paddingLeft: '0.5em', paddingRight: '2em'}}name="warning sign" />} />
                                                        ) : (
                                                            <></>
                                                        )
                                                        }
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        <Label.Group size='medium'>
                                                            <Label>
                                                                2FA Requirement
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(org.two_factor_requirement_enabled)} name={getIconName(org.two_factor_requirement_enabled)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                {org.dependabot_alerts_exist ? 'Unresolved Dependabot Alerts' : 'Free of Dependabot Alerts'}
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(!org.dependabot_alerts_exist)} name={getIconName(!org.dependabot_alerts_exist)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                {org.code_alerts_exist ? 'Unresolved Code Scan Alerts' : 'Free of Code Scan Alerts'}
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(!org.code_alerts_exist)} name={getIconName(!org.code_alerts_exist)} />
                                                                </Label.Detail>
                                                            </Label>
                                                            <Label>
                                                                {org.secret_alerts_exist ? 'Unresolved Secret Scan Alerts' : 'Free of Secret Scan Alerts'}
                                                                <Label.Detail>
                                                                    <Icon color={getIconColor(!org.secret_alerts_exist)} name={getIconName(!org.secret_alerts_exist)} />
                                                                </Label.Detail>
                                                            </Label>
                                                        </Label.Group>
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        )
                                    })}
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