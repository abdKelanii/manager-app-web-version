"use client";

import Stations from "../inputs/Stations";
import Header from "../ui/Header";
import Button from "../ui/Button";
import { addStations } from "../../firebase/databaseServices";
import { useState } from "react";
import { useSelector } from "react-redux";

const BoH = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const addedStations = useSelector((state) => state.BoH);

  const handleSubmit = async () => {
    if (addedStations.length === 0) {
      setErrorMessage("Please add at least one station before submitting.");
      setSuccessMessage(null);
      return;
    }
    try {
      await addStations(addedStations);
      setSuccessMessage("Stations submitted successfully!");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error submitting stations. Please try again later.");
      setSuccessMessage(null);
      console.error("Error submitting stations:", error);
    }
  };

  return (
    <div className="mt-10 md:w-[75%]">
      <div className="w-full flex justify-center items-center ">
        <Header title="BoH Setup" />
      </div>
      <Stations />
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

export default BoH;
