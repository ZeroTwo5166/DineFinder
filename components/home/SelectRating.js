import Data from '@/Shared/Data';
import React, { useState, useEffect } from 'react';

const SelectRating = ({ onRatingChange }) => {
  const [selectedRating, setSelectedRating] = useState([]);

  const onSelectRating = (isChecked, value) => {
    let updatedRating;
    if (isChecked) {
      updatedRating = [...selectedRating, value]; // Add selected rating
    } else {
      updatedRating = selectedRating.filter((n) => n !== value); // Remove unchecked rating
    }
    setSelectedRating(updatedRating); // Update state
  };

  // Use useEffect to call onRatingChange when selectedRating updates
  useEffect(() => {
    onRatingChange(selectedRating); // Pass updated rating array to parent
    console.log(selectedRating);
  }, [selectedRating]);

  return (
    <div className='px-2 mt-[120px]'>
      <h2 className='font-bold'>Select Rating</h2>
      <div>
        {Data.ratingList.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <label>{item.icon}</label>
            <input
              type='checkbox'
              onChange={(e) => onSelectRating(e.target.checked, item.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRating;
