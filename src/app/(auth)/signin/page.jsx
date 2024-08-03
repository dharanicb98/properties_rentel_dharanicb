'use client'

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { TextField, Button} from '@mui/material';
import Link from 'next/link';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter()
  
  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const existingUsers = Cookies.get('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    const user = users.find(user => user.username === username);
   
    if (!user) {
      alert('Invalid username');
      return;
    }

    if (user.password !== password) {
      alert('Invalid password');
      return;
    }

    const token = btoa(JSON.stringify({ username }));

    Cookies.set('authToken', token, { expires: 7 }); 
    Cookies.set('userData', JSON.stringify(user), { expires: 7 }); 

    router.push('/')
  };
  

  return (
     <div className='flex items-center justify-center h-screen bg-slate-200'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4 bg-white shadow-xl w-[400px] h-[300px] p-5 rounded-lg'>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
              fullWidth
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
            />

            <Button type="submit" variant="contained" color="primary">Login</Button>
            <center>Don’t have an account? {' '}<Link href="/signup" className='underline cursor-pointer'>Sign Up</Link></center>
        </form>
     </div>
  );
};

export default LoginForm;
