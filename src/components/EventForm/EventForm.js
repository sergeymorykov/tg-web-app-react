import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import './EventForm.css'; // Если у вас есть стили для формы

const EventForm = () => {
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [eventDate, setEventDate] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        const eventData = {
            event_name: eventName,
            description,
            created_by: createdBy,
            event_date: eventDate,
        };

        try {
            const response = await axios.post('sergeymorykov-tg-web-backend-842d.twc1.net/add_event', eventData);
            console.log('Event added successfully:', response.data);
            window.location.href = 'http://localhost:3000/events';
            // Можно перенаправить или сбросить форму после успешного добавления
        } catch (error) {
            console.error('Error adding event:', error);
            // Обработка ошибок, если необходимо
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box className="event-form-container">
                <Typography component="h1" variant="h5">
                    Добавить событие
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="eventName"
                                label="Название события"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Описание"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="eventDate"
                                label=""
                                type="datetime-local"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                        Добавить событие
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EventForm;
