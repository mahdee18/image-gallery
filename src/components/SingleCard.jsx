import React, { useState, useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import "aos/dist/aos.css";
import AOS from "aos";

const SingleCard = ({
  src,
  title,
  id,
  index,
  moveImage,
  isFeature,
  selectedImages,
  toggleImageSelection,
}) => {
  const isSelected = selectedImages.includes(id);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  const cardClasses = `card border border-gray-300 border-1 ${isFeature ? "featured" : ""
    } ${isSelected ? "opacity-50" : "opacity-100"}`;

  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
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

  drag(drop(ref));

  // Attach touch events to the drag preview
  preview(getEmptyImage(), { captureDraggingState: true });

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
      <div className="card-content rounded-lg"
        data-aos="fade-up" // AOS animation attribute
      >
        <img src={src} alt={title} />
        {/* Checkbox - Hidden by default, shown on hover, and always visible when selected */}
        <input
          type="checkbox"
          className={`checkbox ${isHovered || isSelected ? "visible" : "hidden"}`}
          checked={isSelected}
          onChange={() => toggleImageSelection(id)}
        />
      </div>
    </div>
  );
};

export default SingleCard;
