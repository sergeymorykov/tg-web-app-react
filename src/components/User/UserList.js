import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Avatar, Typography, Box, CssBaseline } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './UserList.css';
import { useTelegram } from '../../hooks/useTelegram';

const theme = createTheme();
function UserList() {
    const [users, setUsers] = useState([]);
    const {user_id} = useTelegram();
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
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5" sx={{ml: 1}}>
                Список пользователей
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container>      
                    {users.map(user => (
                        <Grid key={user.id_user} sx={{ml: 13}}>
                            <Avatar
                                alt="Remy Sharp"
                                src={user.photo}
                                sx={{ width: 200, height: 200}}
                            >
                            </Avatar>            
                            <Typography component="h1" variant="h5" textAlign={'center'}>
                                {user.fullname}                
                            </Typography>  
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        className='dislike'
                                        type="button"
                                        onClick={() => {
                                            axios.post('sergeymorykov-tg-web-backend-842d.twc1.net/dislike', {critic_id: user_id, user_id: user.id_user, rating: 0});
                                        }}
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}                                        
                                    >
                                    </Button> 
                                </Grid>     
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        className='like'
                                        type="button"
                                        
                                        onClick={() => {
                                            axios.post('sergeymorykov-tg-web-backend-842d.twc1.net/like', {critic_id: user_id, user_id: user.id_user, rating: 1});
                                        }}
                                        variant="contained"  
                                        sx={{ mt: 3, mb: 2 }}                                      
                                    >
                                    </Button> 
                                </Grid>                                                             
                            </Grid>  
                        </Grid>                        
                    ))}
                </Grid>
            </Box>
        </Box>
        </Container>
        </ThemeProvider>
    );
}

export default UserList;
