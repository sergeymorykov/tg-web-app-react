import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ReactComponent as Logo } from './logo_white_full.svg'
import "./Header.css"

export default function SearchAppBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Logo />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
