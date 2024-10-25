import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Input from '@mui/material/Input';
import { Slider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import student_icon from './student-icon.png';
import "./SignUp.css";

const theme = createTheme();

const interests = [
  "Карьера, стартапы, поиск команды и нетворкинг", 
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
    value: 0,
    label: 'Крайне не интересует',
  },
  {
    value: 0.5,
    label: 'Нейтрально',
  },
  {
    value: 1,
    label: 'Захватывает',
  },
]

const listItems = interests.map((interest) => 
  
    <Grid item xs={12}>
      <Typography>{interest}</Typography>
      <Slider
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
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    const form = {
      fullname : data.get('fname') +' '+ data.get('lname'),
      email: data.get('email'),
      password: data.get('password')
    };
    //await axios.post("http://localhost:3002/api/user/signup", form, );  
    //navigate('/')
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
            <Grid container spacing={2}>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"                
              >
                <label for="image-upload" class="upload-label"><img src={student_icon} /></label> 
                <input type="file" id="image-upload" name="image" accept="image/*" class="upload-input"/> 
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