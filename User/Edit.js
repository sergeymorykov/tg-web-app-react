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
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {useTelegram} from "../../hooks/useTelegram";
import './Edit.css'
import { inputAdornmentClasses } from '@mui/material';
import {Select} from 'react-select';
import {makeAnimated} from 'react-select/animated';
import {useConstant} from '../Constant';

const animatedComponents = makeAnimated()

export default function EditProfile() {
    const {user_id, onClose} = useTelegram();
    //const [user, setUser] = useState({});

    const theme = createTheme();

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };
    
    const student_icon = user.photo;
    const handleEditProfile = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = {
            id: user_id,
            fullname: data.get('lname') + ' ' + data.get('fname'),
            photo: document.getElementById('student_icon').src,
            interests: selectedOption?.map((item) => item.value),
        };

        console.log(form);
        /*
        await axios.put(`http://localhost:3002/api/user/editprofile?id=${user_id}`, form);
        */
        onClose()
    };

    const {user, interests} = useConstant();
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
            <Typography component="h1" variant="h5">
                Редактировать
            </Typography>
            <Box component="form" noValidate onSubmit={handleEditProfile} sx={{ mt: 3 }}>
                <Grid container spacing={2} >
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lname"
                        label="Фамилия"
                        name="lname"
                        autoComplete="family-name"
                        defaultValue={user.fullname.split(' ')[0]}
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
                    defaultValue={user.fullname.split(' ')[1]}
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
                    <label htmlFor="image-upload" className="upload-label">
                        <img src={student_icon} id='student_icon'  width="200" height="200"/></label> 
                    <input type="file" id="image-upload" className="upload-input" onChange={event => {
                        var file = event.target.files[0];
                        var imageUrl = URL.createObjectURL(file);
                        document.getElementById('student_icon').src = imageUrl;
                    }}/>
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
                        defaultValue={user.interests}
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
                    Сохранить
                </Button>    
                </Grid>      
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    )
}
