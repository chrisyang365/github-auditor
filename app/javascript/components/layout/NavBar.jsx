import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../App";
import { Menu, Segment, Icon } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import GithubButton from 'react-github-login-button';
import axios from 'axios';

export default function NavBar() {
    const { state, dispatch } = useContext(AuthContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    const { client_id, redirect_uri } = state;

    useEffect(() => {
        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        // If Github API returns the code parameter
        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, null, newUrl[0]);
            setData({ ...data, isLoading: true });

            const requestData = {
                code: newUrl[1]
            };

            const proxy_url = state.proxy_url;

            // Use code parameter and other parameters to make POST request to proxy_server
            axios.post(proxy_url, requestData)
                .then((res) => {
                    dispatch({
                        type: "LOGIN",
                        payload: { user: res.data, isLoggedIn: true }
                    });
                })
                .catch((error) => {
                    setData({
                        isLoading: false,
                        errorMessage: "Sorry! Login failed"
                    });
                })
        }
    }, [state, dispatch, data]);

    const handleLogin = () => {
        setData({ ...data, errorMessage: "" });
        window.location.replace(`https://github.com/login/oauth/authorize?scope=user%20admin:org%20security_events%20repo%20admin:org_hook&client_id=${client_id}&redirect_uri=${redirect_uri}`)
        //return <Redirect to={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`} />
    }

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }

    return (
        state.isLoggedIn ? (
            <Segment inverted attached='bottom'>
                <Menu inverted pointing secondary>
                    <Menu.Item
                        name='organizations'
                        as={Link}
                        to={'/orgs'}
                    />
                    <Menu.Item
                        name='docs'
                        as={Link}
                        to={'/docs'}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item style={{ pointerEvents: 'none' }} // not clickable, just for show
                            name='loggedin'
                            content={'Logged in: ' + state.user.username}
                            onClick={() => []} // needed to maintain faint color like other icons
                        />
                        <Menu.Item
                            name='logout'
                            onClick={handleLogout}
                        >
                            <Icon name='sign-out' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        ) : (
            <Segment inverted attached='bottom'>
                <Menu inverted pointing secondary>
                    <Menu.Item
                        name='welcome'
                        as={Link}
                        to={'/login'}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='login'
                            content='Log in with GitHub'
                            onClick={handleLogin} />
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    )
}