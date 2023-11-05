import React, { useState, useEffect, useCallback } from "react";

const SingleCard = ({ src, title, id, index,  isFeature, selectedImages, toggleImageSelection }) => {
  const isSelected = selectedImages.includes(id);
  const [isHovered, setIsHovered] = useState(false);
  const [{ }, drag, preview] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const cardClasses = `card border border-gray-300 border-1 ${isFeature ? 'featured' : ''} ${isSelected ? 'opacity-50' : 'opacity-100'}`;

  const ref = React.useRef(null);

  drag(drop(ref));

  // Attach touch events to the drag preview
  preview(getEmptyImage(), { captureDraggingState: true });

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref}
      className={cardClasses}
    >
      {/* Container for image and checkbox */}
      <div className="card-content rounded-lg">
        <img src={src} alt={title} />
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