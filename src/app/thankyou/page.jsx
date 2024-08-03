'use client'
import Header from '@/components/header'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@mui/material';
import Cookies from 'js-cookie';

function Thankyou() {
  const router = useRouter();
  const authToken = Cookies.get('authToken');
  let userData = null;

  if (authToken) {
      const { username } = JSON.parse(atob(authToken));
      const existingUsers = Cookies.get('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
  
      userData = users.find(user => user.username === username);
  }

  return (
    <div>
        <Header/>
        <div className='flex items-center justify-center flex-col mt-20'>
          <h1 className='font-bold text-lg underline'>Thank you # {userData?.username}</h1>
          <div className='mt-2'><Button onClick={() => router.push('/')} variant="contained" color="primary">Listing</Button></div>
        </div>
    </div>
  )
}

export default Thankyou