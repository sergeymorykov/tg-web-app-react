import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import Event from '../Event/Event'; // Убедитесь, что путь правильный
import './EventList.css'; // Импорт стилей

const EventList = ({ events }) => {
    return (
        <Container component="main" maxWidth="md">
            <Box className="event-list-container">
                <Typography className="event-list-title" component="h1" variant="h5">
                    Список событий
                </Typography>
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
