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
import { useTelegram } from "../../hooks/useTelegram";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState, useCallback, useEffect } from 'react';
import { useConstant } from '../Constant';
import student_icon from './student-icon.png';
import './SignUp.css';

const animatedComponents = makeAnimated();
const theme = createTheme();

const SignUp = () => {
    const [image, setImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const { interests } = useConstant();
    const { user_id, onClose, tg } = useTelegram();

    const handleFileSelected = (event) => {
        let file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            // Event when file reading is finished
            reader.onload = function (e) {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
            let imageUrl = URL.createObjectURL(file);
            document.getElementById('student_icon').src = imageUrl;
        }
    };

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const onSendData = useCallback(() => {
        const form = {
            id: user_id,
            fullname: document.getElementById('lname').value + ' ' + document.getElementById('fname').value,
            photo: image,
            interests: selectedOption?.map((item) => item.value)
        };

        console.log(form);
        window.Telegram.WebApp.sendData(JSON.stringify(form));
        onClose();
    }, [image, selectedOption, user_id, onClose]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Регистрация'
        });
    }, [tg]);

    useEffect(() => {
        if (!image || !selectedOption) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [image, selectedOption, tg]);

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
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={student_icon} />
                  <Typography component="h1" variant="h5">
                      Регистрация
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 3 }}>
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
                                  required
                                  fullWidth
                                  id="fname"
                                  label="Имя"
                                  name="fname"
                                  autoComplete="given-name"
                                  autoFocus
                              />
                          </Grid>
                          <Grid item xs={12} textAlign="center">
                              <label htmlFor="image-upload" className="upload-label">
                                  <img src={student_icon} id='student_icon' width="200" height="200" alt="student icon" />
                              </label>
                              <input
                                  type="file"
                                  id="image-upload"
                                  name="image"
                                  accept="image/*"
                                  onChange={handleFileSelected}
                                  className="upload-input"
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <Select
                                  onChange={handleChange}
                                  closeMenuOnSelect={false}
                                  components={animatedComponents}
                                  isMulti
                                  options={interests}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <Button
                                  type="button"
                                  fullWidth
                                  variant="contained"
                                  onClick={onSendData}
                                  sx={{ mt: 3, mb: 2 }}
                              >
                                  Регистрация
                              </Button>
                          </Grid>
                      </Grid>
                  </Box>
              </Box>
          </Container>
      </ThemeProvider>
  );
};

export default SignUp;


/*
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
import {useTelegram} from "../../hooks/useTelegram";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState } from 'react';
import {useConstant} from '../Constant';

const animatedComponents = makeAnimated()
const theme = createTheme();




export default function SignUp() {

  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const {interests} = useConstant();
  const {user_id, onClose} = useTelegram();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      id : user_id,
      fullname : data.get('lname')  +' '+ data.get('fname'),
      photo: image,
      interests: selectedOption?.map((item) => item.value)
    };       
    await axios.post("http://127.0.0.1:5000/users_reg", form); 
    window.Telegram.WebApp.sendData(JSON.stringify(form)); 
    onClose()
  };

  const handleFileSelected = (event) => {
    let file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        // Событие завершения чтения файла
        reader.onload = function(e) {
          setImage(e.target.result);
        };
        reader.readAsDataURL(file);
        let imageUrl = URL.createObjectURL(file);        
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
                <label htmlFor="image-upload" className="upload-label"><img src={student_icon} id='student_icon'  width="200" height="200"/></label> 
                <input type="file" id="image-upload" name="image" accept="image/*" onChange={handleFileSelected} className="upload-input"/> 
              </Grid>        
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"     
                sx={{ paddingTop: 7 }}           
              >
              <Select
                    onChange={handleChange}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={interests}
                    className="basic-multi-select"
                    classNamePrefix="select"
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
  */