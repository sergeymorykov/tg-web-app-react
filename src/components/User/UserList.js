import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();
function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);


    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Users List
            </Typography>
            <List>
                {users.map(user => (
                    <ListItem key={user.id}>
                        <Avatar src={user.photo} />
                        <Typography component="h1" variant="h5">
                            {user.fullname}                
                        </Typography>  
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default UserList;
