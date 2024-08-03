'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSwimmingPool, faMountain, faTree, faBuilding, faChevronLeft, faChevronRight, faRedo } from '@fortawesome/free-solid-svg-icons';
import {useRef} from 'react'

const categories = [
  // { name: "Beach House", icon: faHome },
  { name: "All", icon: faTree },
  { name: "Cabin", icon: faTree },
  { name: "Cottage", icon: faBuilding },
  { name: "Villa", icon: faSwimmingPool },
  { name: "Mansion", icon: faMountain },

  { name: "Apartment", icon: faBuilding },
  { name: "Farmhouse", icon: faHome },
  { name: "Penthouse", icon: faBuilding },
  { name: "Bungalow", icon: faHome },
  { name: "Townhouse", icon: faBuilding },
  { name: "Duplex", icon: faBuilding },
  { name: "Studio", icon: faBuilding },
  { name: "Loft", icon: faBuilding },
  { name: "Chalet", icon: faMountain },
  { name: "Castle", icon: faBuilding },
];

const CategorySlider = ({ selectedCategory, onCategoryChange, onReset }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };


  return (
    <>
    <div className="relative mb-3 flex items-center overflow-x-auto">

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white border rounded-full shadow-md"
        onClick={scrollLeft}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div ref={sliderRef}
        className="flex overflow-x-auto no-scrollbar items-center gap-x-3"
        style={{ padding: '0 3rem' }} >
        
        {categories.map(category => (
          <div
            key={category.name}
            className={`${selectedCategory === category.name ? 'border-black' : ''} shadow-md flex items-center gap-x-2 border px-3 py-2 rounded-md cursor-pointer hover:border-black`}
            onClick={() => onCategoryChange(category.name)}>
            <FontAwesomeIcon icon={category.icon} />
            <span>{category.name}</span>
          </div>
        ))}

      </div>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white border rounded-full shadow-md"
        onClick={scrollRight}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
     
    </div>
    </>
  )

};

export default CategorySlider