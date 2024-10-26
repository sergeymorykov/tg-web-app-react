import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Slider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import student_icon from './student-icon.png';
import "./SignUp.css";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {useTelegram} from "../../hooks/useTelegram";

const theme = createTheme();

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
]

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

const listItems = interests.map((interest) => 
  
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center" 
      sx={{ paddingTop: interests.indexOf(interest) === 0 ?  1 : 7 , paddingLeft: 3  }}  
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


export default function SignUp() {
  const {onClose} = useTelegram();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let interestObject = {}
    interests.map((interest) =>
      interestObject[interest] = data.get(interest)
    )
    const form = {
      fullname : data.get('lname')  +' '+ data.get('fname'),
      photo: base64_encode(data.get('image')),
      interests: interestObject
    };
    onClose()
    //await axios.post("http://localhost:3002/api/user/signup", form, );  
  };

  const handleFileSelected = (event) => {
    var file = event.target.files[0];
    
    if (file) {
        var imageUrl = URL.createObjectURL(file);        
        document.getElementById('student_icon').src = imageUrl;
    }
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Фамилия"
                  name="lname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="Имя"
                  autoFocus
                />
              </Grid>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"     
                sx={{ paddingTop: 7, paddingLeft: 3 }}           
              >
                <label for="image-upload" class="upload-label"><img src={student_icon} id='student_icon'  width="200" height="200"/></label> 
                <input type="file" id="image-upload" name="image" accept="image/*" onChange={handleFileSelected} class="upload-input"/> 
              </Grid>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center" 
                sx={{ paddingTop: 3 }} 
              >
                <Typography component="h1" variant="h5">
                  Интересы
                </Typography>
              </Grid>
              {listItems}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Регистрация
            </Button>          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}