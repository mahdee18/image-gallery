const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const AddImage = ({ }) => {

  return (
    <div className="images-container">
    <div
      {...getRootProps({ style })}
      className="card flex justify-center items-center h-full w-full border-dashed border-2 border-gray-500 p-8 rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
        <img
          className="w-10 h-10 mx-auto mb-10"
          src="https://i.ibb.co/RpvDj8H/add-image.png"
          alt="Add images"
        />
        <p className="text-gray-500 text-lg lg:text-xl">Add Images</p>
      </div>
    </div>
  </div>
);
};

export default AddImage;



