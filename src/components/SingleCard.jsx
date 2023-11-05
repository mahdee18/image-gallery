import React from "react";

const SingleCard = ({ src, title, id, toggleImageSelection }) => {


  return (
    <div
      ref={(node) => {
        ref.current = node;
        // Attach the ref to the drag preview so it can be used for positioning
        drag(ref);
      }}
      className={cardClasses}
    >
      {/* Container for image and checkbox */}
      <div className="card-content rounded-lg">
        <img src={src} alt={title} />
        {/* Checkbox - Hidden by default and shown on hover */}
        <input
          type="checkbox"
          className="checkbox"
          checked={isSelected}
          onChange={() => toggleImageSelection(id)}
        />
      </div>
    </div>
  );
};

export default SingleCard;