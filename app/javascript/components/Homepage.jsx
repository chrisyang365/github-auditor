import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "./App";
import { Card, Dimmer, Header, Image, Loader, Menu, Segment } from 'semantic-ui-react'
import axios from 'axios';

function Homepage(props) {
    const { state, dispatch } = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState('profile');
    const [isLoaded, setIsLoaded] = useState(false);
    const [orgData, setOrgData] = useState([]);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }

    useEffect(() => {
        if (!isLoaded && state.isLoggedIn) {
            const access_token = state.user.access_token;
            axios.get("https://api.github.com/user/orgs", {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            })
            .then((res) => {
                setOrgData(res.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(true);
            })
        }
    }, [isLoaded, orgData])

    return (
        <div>
            {state.isLoggedIn ? (
                <>
                    <Segment inverted>
                        <Menu inverted pointing secondary>
                            <Menu.Item
                                name='profile'
                                active={activeItem === 'profile'}
                                onClick={(e, { name }) => setActiveItem(name)}
                            />
                            <Menu.Item
                                name='organizations'
                                active={activeItem === 'organizations'}
                                onClick={(e, { name }) => setActiveItem(name)}
                            />
                            <Menu.Item
                                name='repositories'
                                active={activeItem === 'repositories'}
                                onClick={(e, { name }) => setActiveItem(name)}
                            />
                            <Menu.Menu position='right'>
                                <Menu.Item
                                name='logout'
                                active={activeItem === 'logout'}
                                onClick={handleLogout}
                                />
                            </Menu.Menu>
                        </Menu>
                    </Segment>
                    {activeItem === 'profile' && (
                        <h1>Welcome {state.user.username}!</h1>
                    )}
                    {activeItem === 'organizations' && (
                        <>
                            {isLoaded ? (
                                <>
                                    {orgData.length > 0 ? (
                                        <Card.Group centered>
                                            {orgData.map((org) => {
                                                return (
                                                    <Card link>
                                                        <Image src={org.avatar_url} wrapped ui={false} />
                                                        <Card.Content>
                                                            <Card.Header>{org.login}</Card.Header>
                                                            <Card.Description>
                                                                {org.description}
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
                    )}
                    {activeItem === 'repositories' && (
                        <h1>Repositories</h1>
                    )}
                </>
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    )
}

export default Homepage;