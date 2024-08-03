'use client'
import React, { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {  TextField, Button, Typography, FormHelperText } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    // if (!photo) newErrors.photo = 'Profile photo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const existingUsers = Cookies.get('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    const userExists = users.find(
      user => user.email === email || user.username === username
    );
    if (userExists) {
      alert('Email or username already exists');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    const newUser = {
      email,
      username,
      password,
      photo: photo ? URL.createObjectURL(photo) : ''
    };

    const updatedUsers = [...users, newUser];
    Cookies.set('users', JSON.stringify(updatedUsers), { expires: 7 });

    router.push('/signin');
  };

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
  };



  return (
    <div className='flex items-center justify-center h-screen bg-slate-200'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4 bg-white shadow-xl w-[400px] h-[490px] p-5 rounded-lg'>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          type="text"
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
        <div className='my-4 flex gap-x-2 items-center'>
          {photo ? (
            <>
              <Image src={URL.createObjectURL(photo)} alt="Profile Preview" width={50} height={50} />
              <Button variant="outlined" color="error" onClick={handleRemovePhoto}>
                Remove Photo
              </Button>
            </>
          ) : (
            <>
            <Button component='label' size='small' variant='contained' sx={{padding:'4px'}} htmlFor='account-settings-upload'>
              <UploadFileIcon sx={{ mr: 1 }} />
              Upload Profile Picture
              <input
                hidden
                type='file'
                value={photo}
                onChange={handleFileUpload}
                id='account-settings-upload'
                ref={fileInputRef}
              />
            </Button>
            </>
          )}
          {errors.photo && <FormHelperText error>{errors.photo}</FormHelperText>}
        </div>
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        <Typography variant="body2" color="textSecondary" align="center">
          Already have an account?{' '}
          <Link href="/signin" className='underline cursor-pointer'>
            Log In
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default SignupForm;
