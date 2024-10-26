
import {Button, Box, Typography, Avatar, Container, Grid, Slider } from '@mui/material';
import * as React from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {useEffect, useState} from "react";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useConstant} from '../Constant';

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

    const {user} = useConstant();
    
    const marks = [
        {
          value: 0.1,
          label: 'Не интересует',
        },
        {
          value: 0.5,
          label: 'Нейтрально',
        },
        {
          value: 0.9,
          label: 'Захватывает',
        },
      ]
      console.log(user.interests);
      
      const listItems = user.interests.map((interest) =>         
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center" 
            sx={{ paddingTop: 7 , paddingLeft: 3  }}  
          >
            <Typography>{interest}</Typography>
            <Slider
              name={interest}
              aria-label={interest}
              defaultValue={0.5}
              step={0.01}
              marks={marks}
              min={0}
              max={1}
              valueLabelDisplay="auto"
              />        
          </Grid>         
      )    
    
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
            {listItems}
        </Box>
    </Container>
    );
}

