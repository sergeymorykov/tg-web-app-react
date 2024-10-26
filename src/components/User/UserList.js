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
            <Grid container>
                {users.map(user => (
                    <Grid key={user.id}>
                        <Avatar
                            alt="Remy Sharp"
                            src={user.photo}
                            sx={{ width: 200, height: 200 }}
                        >
                        </Avatar>            
                        <Typography component="h1" variant="h5">
                            {user.fullname}                
                        </Typography>     
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default UserList;
