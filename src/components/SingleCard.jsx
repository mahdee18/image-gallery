import React, { useState } from "react";
 
const SingleCard = ({ src, title, id, selectedImages, toggleImageSelection }) => {
  const isSelected = selectedImages.includes(id);
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    ref={(node) => {
      ref.current = node;
      drag(ref);
    }}
    className={cardClasses}
  >
    {/* Container for image and checkbox */}
    <div className="card-content rounded-lg">
      <img src={src} alt={title} />
      {/* Checkbox - Hidden by default, shown on hover, and always visible when selected */}
      <input
        type="checkbox"
        className={`checkbox ${isHovered || isSelected ? 'visible' : 'hidden'}`}
        checked={isSelected}
        onChange={() => toggleImageSelection(id)}
      />
    </div>
  </div>
);
};

export default SingleCard;