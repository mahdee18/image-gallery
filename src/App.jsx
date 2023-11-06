import React, { useState, useEffect, useCallback } from "react";
import galleryList from "./data.js";
import { FaCheckSquare } from "react-icons/fa";
import AddImage from "./components/AddImage.jsx";
import SingleCard from "./components/SingleCard.jsx";

const App = () => {
  // Load selectedImages and deletedImages from localStorage
  const initialSelectedImages = JSON.parse(localStorage.getItem("selectedImages")) || [];
  const initialDeletedImages = JSON.parse(localStorage.getItem("deletedImages")) || [];

  // Clear deletedImages from localStorage 
  localStorage.removeItem("deletedImages");

  const [images, setImages] = useState(galleryList);
  const [selectedImages, setSelectedImages] = useState(initialSelectedImages);
  const [deletedImages, setDeletedImages] = useState(initialDeletedImages);
  const [isDeleteButtonHovered, setDeleteButtonHovered] = useState(false);

  // Function to move an image within the list
  const moveImage = (dragIndex, hoverIndex) => {
    setImages((prevImages) => {
      const clonedImages = [...prevImages];
      const removedImage = clonedImages.splice(dragIndex, 1)[0];
      clonedImages.splice(hoverIndex, 0, removedImage);
      return clonedImages;
    });
  };

  // Function to toggle the selection of an image
  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  //  Function to delete selected images
  const deleteSelectedImages = () => {
    const remainingImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    const deleted = images.filter((image) => selectedImages.includes(image.id));
    setImages(remainingImages);
    setDeletedImages([...deletedImages, ...deleted]);
    setSelectedImages([]);
  };

  // Save selectedImages and deletedImages to localStorage when they change
  useEffect(() => {
    localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
    localStorage.setItem("deletedImages", JSON.stringify(deletedImages));
  }, [selectedImages, deletedImages]);

  const onDrop = useCallback((acceptedFiles) => {
    const updatedImages = acceptedFiles.map((file, index) => ({
      id: `new-image-${index}`,
      img: URL.createObjectURL(file),
      title: "New Image", 
    }));

    // Add the uploaded images to the existing images
    setImages((prevImages) => [...prevImages, ...updatedImages]);
  }, []);
  return (
    <div className="container">
      <div className="bg-gray-100 p-10 rounded-lg flex items-center justify-between">
        <div className="text-center md:mb-2 text-sm lg:text-3xl font-semibold flex items-center gap-2">
          <FaCheckSquare className={`text-blue-600 w-6 h-6 ${selectedImages.length !== 0 ? 'block' : 'hidden'}`} />
          {selectedImages.length === 0
            ? "Image Gallery"
            : `${selectedImages.length} ${selectedImages.length === 1 ? "File" : "Files"} Selected`}
        </div>

        {selectedImages.length > 0 && (
          <div
            className="delete-button-container"
            onMouseEnter={() => setDeleteButtonHovered(true)}
            onMouseLeave={() => setDeleteButtonHovered(false)}
          >
            <button
              onClick={deleteSelectedImages}
              className="text-red-600 text-sm lg:text-xl font-semibold"
            >
              Delete Files
            </button>
            {isDeleteButtonHovered && (
              <hr className="w-full border-1 border-red-600 rounded-lg " />
            )}
          </div>
        )}
      </div>
      <div className="bg-gray-100 px-10 rounded-lg mb-10">
        <hr className="w-full border-2 border-x-gray-300" />
        <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <SingleCard
              src={image.img}
              title={image.title}
              id={image.id}
              index={index}
              moveImage={moveImage}
              isFeature={index === 0}
              selectedImages={selectedImages}
              toggleImageSelection={toggleImageSelection}
            />
          ))}
          <AddImage onDrop={onDrop} />
        </main>
      </div>
    </div>
  );
};

export default App;

