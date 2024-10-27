// ListUsers.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CssBaseline, Paper } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './ListUsers.css';
import ProfileUser from '../ProfileUser/ProfileUser';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // индекс текущего пользователя

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleNextUser = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
    };

    if (users.length === 0) {
        return <Typography>Загрузка пользователей...</Typography>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ pt: 4 }}>
                <CssBaseline />
                <Paper elevation={3} sx={{ p: 4, borderRadius: '15px', backgroundColor: '#f7f9fc' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4" sx={{ mb: 4, color: '#333' }}>
                            Профиль пользователя
                        </Typography>
                        {users[currentIndex] && (
                            <ProfileUser user={users[currentIndex]} onRate={handleNextUser} />
                        )}
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default ListUsers;
