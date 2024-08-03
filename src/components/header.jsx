'use client'

import React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button, Typography,  Badge, IconButton  } from '@mui/material';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector } from 'react-redux';

function Header({handleOpenFilter}) {
    const router = useRouter();
    const cartItems = useSelector(state => state.cart.items);

    const authToken = Cookies.get('authToken');
    let userData = null;

    if (authToken) {
        const { username } = JSON.parse(atob(authToken));
        const existingUsers = Cookies.get('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];
    
        userData = users.find(user => user.username === username);
    }
  
    const handleLogout = () => {
      Cookies.remove('authToken');
      router.push('/signin');
    };


    const handleViewCartNavigate = () => {
        router.push('/cart')
    }

    const CartIcon = () => {
      return (
        <IconButton color="inherit" onClick={handleViewCartNavigate}>
          <Badge badgeContent={cartItems?.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      );
    };


    

  return (
    <div className='shadow p-6 flex items-center justify-between'>
        <h1 onClick={() => router.push('/')} className='font-semibold text-2xl italic cursor-pointer'>Totality corp</h1>
        <div className='flex items-center gap-x-2'>
            <div onClick={handleOpenFilter} className='cursor-pointer'><FilterAltIcon /></div>
            <CartIcon/>
            {userData?.photo ? (
              <img src={userData?.photo} alt="Profile" width={50} height={50} className='rounded-full' />
            ) : (
                <AccountCircleIcon sx={{ fontSize: 50, color: 'gray',  }} />
            )}
            <Typography variant='body1'>{userData?.username}</Typography>
            <div  onClick={handleLogout} className='cursor-pointer'>
             <LogoutIcon />
            </div>
        </div>
    </div>
  )
}

export default Header