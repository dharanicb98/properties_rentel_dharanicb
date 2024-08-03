// CartPage.js
'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { formatCurrency } from '../../utils'; // Utility function to format currency
import Header from '@/components/header';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/store/slices/propertyCart';

const CartPage = () => {
  const router = useRouter();
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    dispatch(clearCart())
    router.push('/thankyou')
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <Header/>
      {cartItems?.length === 0 && (
        <div className='flex items-center justify-center flex-col mt-20'>
           <h1 className='font-bold text-lg underline'>No  cart items added</h1>
           <div className='mt-2'><Button onClick={() => router.push('/')} variant="contained" color="primary">Add</Button></div>
        </div>
      )}

      {cartItems?.length > 0 && (
        <div>
          <div className='container mx-auto p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='border p-4'>
              <h2 className='text-lg font-bold mb-4'>Checkout Details</h2>
              <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                className="mt-4"
              >
                Confirm & Pay
              </Button>
            </div>

      
            <div className='border p-4 flex justify-between  flex-col'>
              <div className=''>
                <h2 className='text-lg font-bold mb-4'>Cart Details</h2>
                <div className='flex flex-col'>
                  {cartItems.map(item => (
                    <div key={item.id} className='flex justify-between border-b py-2'>
                    <div className='flex items-center gap-x-2'> 
                      <img src={item?.image} className='w-16 h-16 rounded-md' />
                      <span className='font-bold text-lg'>{item.title}</span>
                      </div>
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-between font-bold mt-4'>
                <span>Total:</span>
                <span>{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>
         </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
