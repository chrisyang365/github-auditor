import React, { useContext } from 'react';
import { AuthContext } from "../App";
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";

export default function NavBar(){
    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }

    const handleRedirect = (path) => {
        browserHistory.push({
            pathname: path
        })
    }
    
    return (
    <Segment inverted>
        <Menu inverted pointing secondary>
            <Menu.Item
                name='profile'
                as={Link}
                to={'/'}
            />
            <Menu.Item
                name='organizations'
                as={Link}
                to={'/orgs'}
            />
            <Menu.Item
                name='repositories'
                as={Link}
                to={'/'}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                name='logout'
                onClick = {handleLogout}/>
            </Menu.Menu>
        </Menu>
    </Segment>
    )
}