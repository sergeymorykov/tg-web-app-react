import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios'; // Импортируем axios
import './Event.css'; // Импорт стилей
import { useTelegram } from '../../hooks/useTelegram';

const Event = ({ event }) => {
    const { user_id } = useTelegram();
    const handleParticipate = async () => {
        

        const eventName = event.event_name; // Название события, которое передаем на сервер

        try {
            const response = await axios.post('sergeymorykov-tg-web-backend-842d.twc1.net/register_event', {
                user_id: user_id,
                event_name: eventName,
            });

            if (response.status === 200) {
                alert('Вы успешно зарегистрировались на событие!');
            } else {
                alert('Произошла ошибка при регистрации.');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Не удалось зарегистрироваться.');
        }
    };

    return (
        <Box className="event-container">
            <Typography className="event-title">{event.event_name}</Typography>
            <Typography className="event-description">{event.description}</Typography>
            <Typography className="event-date">
                <strong>Дата события:</strong> {new Date(event.event_date).toLocaleString()}
            </Typography>
            <Button 
                className="event-button" 
                variant="contained" 
                onClick={handleParticipate} // Добавляем обработчик клика
            >
                Участвовать
            </Button>
        </Box>
    );
};

export default Event;