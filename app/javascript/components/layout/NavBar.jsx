import React, { useContext } from 'react';
import { AuthContext } from "../App";
import { Menu, Segment } from 'semantic-ui-react'

export default function NavBar(){
    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }
    
    return (
    <Segment inverted>
        <Menu inverted pointing secondary>
            <Menu.Item
                name='profile'
                href = '/'
            />
            <Menu.Item
                name='organizations'
                href = '/orgs'
            />
            <Menu.Item
                name='repositories'
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