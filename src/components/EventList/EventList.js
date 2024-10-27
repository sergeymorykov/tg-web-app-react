import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material'; // Импортируем необходимые компоненты из MUI
import Event from '../Event/Event'; // Убедитесь, что компонент Event импортируется правильно

const EventList = () => {
    const [events, setEvents] = useState([]); // Состояние для хранения событий
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки

    const handleRedirect = () => {
        window.location.href = 'http://localhost:3000/eventform';
    };
    // Функция для получения данных с сервера
    const fetchEvents = async () => {
        try {
            const response = await fetch('https://sergeymorykov-tg-web-backend-842d.twc1.net/get_event'); // Замените URL на ваш API
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data); // Устанавливаем события в состояние
        } catch (error) {
            console.error('Ошибка при загрузке событий:', error);
        } finally {
            setLoading(false); // Завершаем загрузку
        }
    };

    // useEffect для загрузки данных при монтировании компонента
    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) {
        return <Typography variant="h6">Загрузка событий...</Typography>; // Показать загрузку
    }

    return (
        <Container component="main" maxWidth="md">
            <Box className="event-list-container">
                <Typography className="event-list-title" component="h1" variant="h5">
                    Список событий
                </Typography>
                
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button variant="contained" color="primary" onClick={handleRedirect}>
                        Добавить событие
                    </Button>
                </Box>
                
                <Grid container spacing={3} className="grid-container">
                    {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.event_id}>
                            <Event event={event} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default EventList;
