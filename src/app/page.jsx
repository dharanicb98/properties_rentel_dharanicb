'use client'
import React, { useState } from 'react';
import FilterDialog from '@/components/dialog';
import CategorySlider from '@/components/filter';
import PropertyList from '@/components/properties';
import properties from '../json/properties.json';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    price: [0, 1000],
    location: '',
    bedrooms: 1,
    amenities: [],
  });

  const router = useRouter();

  const filteredProperties = properties.filter(
    property =>
      (selectedCategory === 'All' || property.category === selectedCategory) &&
      (property.price >= filters.price[0] && property.price <= filters.price[1]) &&
      (!filters.location || property.location === filters.location) &&
      property.bedrooms >= filters.bedrooms &&
      filters.amenities.every(amenity => property.amenities.includes(amenity))
  );

  const handleResetCategory = () => setSelectedCategory('All');

 const handleOpenFilter = () => {
  setFilterDialogOpen(true)
 }

  return (
    <div>
      <Header handleOpenFilter={handleOpenFilter}/>
      <div className='p-10 overflow-x-auto'>
      <CategorySlider
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onReset={handleResetCategory}
      />
      <FilterDialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onApplyFilters={setFilters}
      />
       {filteredProperties.length === 0 ?   (
        <div className='flex items-center justify-center flex-col  w-full mt-20'>
          <h1 className='font-bold text-3xl  underline italic'>Opps! Sorry</h1>
          <p className='mt-2 font-semibold'>No properties found</p>
          <div className='mt-2'><Button onClick={handleResetCategory} variant="contained" color="primary">View All</Button></div>
        </div>
      ) : <PropertyList properties={filteredProperties} />}
    </div>
    </div>
  );
};

export default HomePage;
