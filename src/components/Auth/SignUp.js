import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import student_icon from './student-icon.png';
import "./SignUp.css";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {useTelegram} from "../../hooks/useTelegram";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated()
const theme = createTheme();

const interests = [
  {value:"Стартапы, поиск команды и нетворкинг", label:"Стартапы, поиск команды и нетворкинг"},
  {value:"Искусство, фотография и дизайн", label:"Искусство, фотография и дизайн"},
  {value:"Музыка", label:"Музыка"},
  {value:"Хореография", label:"Хореография"},
  {value:"Спорт, фитнес и ЗОЖ", label:"Спорт, фитнес и ЗОЖ"},
  {value:"Литература и история", label:"Литература и история"},
  {value:"Политика, социология, активизм и дебаты", label:"Политика, социология, активизм и дебаты"},
  {value:"Кино и другое многомодальное искусство", label:"Кино и другое многомодальное искусство"},
  {value:"Психология и психическое здоровье", label:"Психология и психическое здоровье"},
  {value:"Соревновательные видеоигры", label:"Соревновательные видеоигры"},
  {value:"Новые технологии, ИИ, техника", label:"Новые технологии, ИИ, техника"},
  {value:"Математика, физика и информатика", label:"Математика, физика и информатика"},
  {value:"Математика, физика и информатика", label:"Математика, физика и информатика"},
  {value :"Волонтерство и благотворительность", label: "Волонтерство и благотворительность"},
  {value :"Настольные игры", label: "Настольные игры"},
  {value :"Путешествия и туризм", label: "Путешествия и туризм"},
  {value :"Английский (иностранные языки)", label: "Английский (иностранные языки)"}
];


export default function SignUp() {
  const {user_id, onClose} = useTelegram();
  var imageFile = null;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      id : user_id,
      fullname : data.get('lname')  +' '+ data.get('fname'),
      photo: imageFile
    };
    

    console.log(form);    
    //await axios.post("http://localhost:3002/api/user/signup", form, );  
    onClose()
  };

  const handleFileSelected = (event) => {
    var file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        // Событие завершения чтения файла
        reader.onload = function(e) {
            imageFile = e.target.result;
        };
        reader.readAsDataURL(file);
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
                sx={{ paddingTop: 7, paddingLeft: 3 }}           
              >
              <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={interests}
                    width="100%"
                  />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Регистрация
              </Button>    
            </Grid>      
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}