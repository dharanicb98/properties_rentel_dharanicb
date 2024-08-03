'use client'
import React, { useState } from 'react';
import { Dialog,  DialogContent, DialogTitle, Button, TextField, MenuItem, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faParking, faTree, faSwimmingPool, faFire, faHotTub } from '@fortawesome/free-solid-svg-icons';
import AmenitiesCheckbox from './checkBox';
import CloseIcon from '@mui/icons-material/Close';

const amenitiesIcons = [
  { name: "WiFi", icon: faWifi },
  { name: "Parking", icon: faParking },
  { name: "Garden", icon: faTree },
  { name: "Pool", icon: faSwimmingPool },
  { name: "Fireplace", icon: faFire },
  { name: "Hot Tub", icon: faHotTub }
];

const locations = ["City Center", "Suburb", "Beachfront", "Forest", "Countryside"];


const FilterDialog = ({ open, onClose, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [bedrooms, setBedrooms] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleApplyFilters = () => {
    onApplyFilters({
      price: priceRange,
      location: selectedLocation,
      bedrooms,
      amenities: selectedAmenities,
    });
    onClose();
  };

  const handleResetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedLocation('');
    setBedrooms(1);
    setSelectedAmenities([]);
    onApplyFilters({
      price: [0, 1000],
      location: '',
      bedrooms: 1,
      amenities: [],
    });
    onClose();
  };

  const handleBedroomsChange = (type) => {
    setBedrooms(prev => {
      if (type === 'increment') return prev + 1;
      if (type === 'decrement' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAmenityChange = (amenityName) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityName)
        ? prev.filter(a => a !== amenityName)
        : [...prev, amenityName]
    );
  };

  const handlerangeOnChange = (e, type) => {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val) || val === '') {
       if (type == 'min') {
        setPriceRange([+val, priceRange[1]])
       }
       if (type === 'max') {
         setPriceRange([priceRange[0], +val])
       }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Filter Properties
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', top: 7, right: 9 }}
          
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>
          <TextField
            label="Price Min"
            
            value={priceRange[0]}
            // onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            onChange={(e) => handlerangeOnChange(e, 'min')}
            fullWidth
            margin="normal"
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            label="Price Max"
        
            value={priceRange[1]}
            // onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            onChange={(e) => handlerangeOnChange(e, 'max')}
            fullWidth
            margin="normal"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </div>

        <TextField
          select
          label="Location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          fullWidth
          margin="normal"
        >
          {locations.map((location) => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </TextField>
       
        <div className='flex items-center justify-between my-3'>
          <h1 className='font-bold text-xl'>Bedrooms</h1>
          <div className='flex items-center gap-x-3'>
              <button className="w-8 h-8" onClick={() => handleBedroomsChange('decrement')} aria-label="Decrease bedrooms">
                <img src="/icons/decrement-outline.svg" alt='decrement' className='cursor-pointer'/>
              </button>
              <div className='text-xl'>{bedrooms}</div>
              <button className="w-8 h-8" onClick={() => handleBedroomsChange('increment')} aria-label="Increase bedrooms">
                <img src="/icons/increment-outline.svg" className='cursor-pointer' alt='increment'/>
              </button>
          </div>
        </div>
     
       <div  className='grid md:grid-cols-3 sm:grid-rows-2 grid-cols-1 gap-6 mt-6'>
        {amenitiesIcons.map((amenity) => (
          <div
              key={amenity.name}
              onClick={() => handleAmenityChange(amenity.name)}
              style={{ borderColor: selectedAmenities.includes(amenity.name) ? 'black' : '' }}
              className="border border-[#D9D9D9] flex flex-col items-center justify-center mt-2  w-[178px] h-[93px] rounded-xl relative cursor-pointer">
              <FontAwesomeIcon icon={amenity.icon} style={{ width: "45px", height: "40px" }} />
              <span className='text-[#5C5C5C] leading-6 text-sm font-normal'>{amenity.name}</span>
              <AmenitiesCheckbox 
                checked={selectedAmenities.includes(amenity.name)} 
                onChange={() => handleAmenityChange(amenity.name)}
                className='absolute top-4 right-3'
              />
            </div>
        ))}
      </div>


      </DialogContent>

      <div className='flex items-center justify-between m-3'>
      <Button variant="outlined" color="error"  onClick={handleResetFilters}>
          Reset Filters
        </Button>
        {/* <Button onClick={onClose}>Cancel</Button> */}
       
        <Button variant="outlined" onClick={handleApplyFilters} >
          Apply
        </Button>
      </div>

    </Dialog>
  );
};

export default FilterDialog;
