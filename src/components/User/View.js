
import {Button, Box, Typography, Avatar, Container } from '@mui/material';
import * as React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect, useState} from "react";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserView() {
    const {user_id} = useTelegram();
    /*
    const [user, setUser] = useState([]);
    useEffect(() => {
        setUser({
            "id": 1,
            "fullname": "Moryakov Sergey",
            "photo": "W29iamVjdCBGaWxlXQ=="
        });
        
        
        axios.get(`http://localhost:3002/api/user/getusers?id=${user_id}`)
            .then(response => {
                setUsers(response.data);
            })
        
    }, [user_id]);
    */

    let navigate = useNavigate();

    const handleEditProfile = () => {        
        navigate('/edit-profile');
    }

    axios.get("http://127.0.0.1:5000/users")
    .then(response => {
        console.log(response.data);
    })
    const user = {
        "id": 1,    
        "fullname": "Moryakov Sergey",
        "photo": base64_decode(require('./photo.txt'))
    }
    const interests = [
        "Стартапы, поиск команды и нетворкинг", 
        "Искусство, фотография и дизайн", 
        "Музыка", 
        "Хореография", 
        "Спорт, фитнес и ЗОЖ", 
        "Литература и история", 
        "Политика, социология, активизм и дебаты", 
        "Кино и другое многомодальное искусство", 
        "Психология и психическое здоровье", 
        "Соревновательные видеоигры", 
        "Новые технологии, ИИ, техника", 
        "Математика, физика и информатика" 
    ];
    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar
                alt="Remy Sharp"
                src={user.photo}
                sx={{ width: 200, height: 200 }}
            >
            </Avatar>            
            <Typography component="h1" variant="h5">
                {user.fullname}                
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleEditProfile}
                sx={{ mt: 3, mb: 2 }}
            >
                Редактировать профиль
            </Button>
        </Box>
    </Container>
    );
}

