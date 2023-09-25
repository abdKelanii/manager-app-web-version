import React from "react";
import FileUpload from "../inputs/FileUpload";
import Header from "../ui/Header";
import Button from "../ui/Button";
import { useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { uploadRestaurantImages } from "../../firebase/databaseServices";

export const uploadRestImages = async (restuarantImages) => {
  const downloadURLs = [];
  try {
    for (const image of restuarantImages) {
      const imageRef = ref(storage, `restuarantImages/${image.name + v4()}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      downloadURLs.push(downloadURL);
    }

    return downloadURLs;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

const Branding = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const restuarantImages = useSelector(
    (state) => state.branding.restuarantImages
  );

  const handleSubmit = async () => {
    if (restuarantImages.length === 0) {
      setErrorMessage("Please add at least one photo before submitting.");
      setSuccessMessage(null);
      return;
    }
    try {
      //   const images = restuarantImages;
      await uploadRestaurantImages(restuarantImages);
      setSuccessMessage("Photos submitted successfully!");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error submitting photos. Please try again.");
      setSuccessMessage(null);
      console.error("Error submitting photos:", error);
    }
  };
  return (
    <div className="md:w-[75%]">
      <Header title="Upload restaurant photos" secondary />
      <FileUpload reduxState="brandingImages" />
      <div className="mb-5">
        <Button name="Submit" onClick={handleSubmit} />
      </div>
      {successMessage && (
        <div className="flex justify-center items-center text-green-500">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="flex justify-center items-center text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Branding;
