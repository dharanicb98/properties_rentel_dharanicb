'use client'
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    // display: 'swap',
});

const theme = createTheme({
    palette: {
        primary: {
          main: '#1976d2', // Replace with your primary color
        },
        secondary: {
          main: '#dc004e', // Replace with your secondary color
        },
      },
});

export default theme;