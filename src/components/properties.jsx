'use client'
import React from 'react';
import { faBed, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/store/slices/propertyCart';

const PropertyList = ({ properties }) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleAddToCart = (property) => {
    dispatch(addToCart(property));
  };

  const handleRemoveFromCart = (property) => {
    dispatch(removeFromCart(property));
  };


  

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-10'>
      {properties?.length > 0 && properties.map(property => {
         const isInCart = cartItems.some(item => item.id === property.id);
        return (
          <div key={property.id} className='border shadow-md rounded-md w-[395px]'>
          <img src={property.image} alt={property.title}   />
          <div className='p-3'>
            <h3 className='font-bold text-lg'>{property.title}</h3>
            <p className='text-[11px]'>{property.description}</p>
            <div className='flex items-center justify-between'><p>Price</p><span className='font-bold text-lg'>${property.price}</span></div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-1'> 
                <div className='flex items-center gap-x-1'><FontAwesomeIcon icon={faBed} style={{ width: '18px', height: '18px'}} /><span className='text-[11px]'>{property?.bedrooms}</span></div>
                <div className='flex items-center gap-x-1'><LocationOnIcon style={{ width: '17px', height: '17px'}}/><span className='text-[11px]'>{property?.location}</span></div>
              </div>
              <Button
                onClick={() => isInCart ? handleRemoveFromCart(property) : handleAddToCart(property)}
                variant="contained"
                size="small"
                startIcon={<FontAwesomeIcon icon={faCartPlus} style={{ width: '10px', height: '10px' }} />}
                style={{ fontSize: '9px' }}>
               {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </Button>
             </div>
          </div>
        </div>
        )
      })}
    </div> 
  );
};

export default PropertyList;
