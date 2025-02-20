// ProfileUser.js
import React from 'react';
import { Button, Grid, Avatar, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useTelegram } from '../../hooks/useTelegram';

function ProfileUser({ user, onRate }) {
    const { user_id } = useTelegram();

    const handleLike = () => {
        axios.post('https://sergeymorykov-tg-web-backend-1a6e.twc1.net/like', { critic_id: user_id, user_id: user.id_user, rating: 1 })
            .then(() => onRate()); // Переключаемся на следующего пользователя после лайка
    };

    const handleDislike = () => {
        axios.post('https://sergeymorykov-tg-web-backend-1a6e.twc1.net/dislike', { critic_id: user_id, user_id: user.id_user, rating: 0 })
            .then(() => onRate()); // Переключаемся на следующего пользователя после дизлайка
    };

    // Преобразуем интересы в форматированный список
    const interests = Array.isArray(user.interests) 
        ? user.interests 
        : user.interests.split(/(?<=[а-яёa-z]),/i).map(interest => interest.trim());

    return (
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar
                alt={user.fullname}
                src={user.photo}
                sx={{ width: 150, height: 150, mb: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            />
            <Typography variant="h6" textAlign="center" color="textPrimary" sx={{ mb: 1 }}>
                {user.fullname}
            </Typography>
            <Box
                sx={{
                    padding: '8px 16px',
                    border: '2px solid #007bff',
                    borderRadius: '8px',
                    backgroundColor: '#e3f2fd',
                    mb: 2,
                    boxShadow: '0 2px 5px rgba(0, 123, 255, 0.2)',
                    textAlign: 'center'
                }}
            >
                {interests.map((interest, index) => (
                    <Typography key={index} variant="body1" color="textSecondary">
                        {interest}
                    </Typography>
                ))}
            </Box>
            <Typography variant="body2" textAlign="center" color="textSecondary" sx={{ mb: 2, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9', width: '100%' }}>
                {user.about}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    className='dislike'
                    onClick={handleDislike}
                    variant="outlined"
                    color="error"
                >
                </Button>
                <Button
                    className='like'
                    onClick={handleLike}
                    variant="contained"
                    color="primary"
                >
                </Button>
            </Box>
        </Grid>
    );
}

export default ProfileUser;
