import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import './Event.css'; // Импорт стилей

const Event = ({ event }) => {
    return (
        <Box className="event-container">
            <Typography className="event-title">{event.event_name}</Typography>
            <Typography className="event-description">{event.description}</Typography>
            <Typography className="event-date">
                <strong>Дата события:</strong> {new Date(event.event_date).toLocaleString()}
            </Typography>
            <Button className="event-button" variant="contained">
                Участвовать
            </Button>
        </Box>
    );
};

export default Event;
