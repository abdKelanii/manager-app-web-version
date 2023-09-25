"use client";

import { useMemo, useState, useEffect } from "react";
import Header from "../ui/Header";
import Input from "../inputs/Input";
import Range from "../inputs/Range";
import CheckboxInput from "../inputs/CheckboxInput";
import CountrySelect from "../CountrySelect";
import dynamic from "next/dynamic";
import Button from "../ui/Button";
import WorkingHours from "../WorkingHours";
import {
  setInput,
  setCountry,
  setCoordinates,
  setIsCompleted,
} from "../../redux/stepper/detailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addDetails } from "../../firebase/databaseServices";

const Details = () => {
  const dispatch = useDispatch();
  const {
    name,
    type,
    description,
    dairy,
    vegan,
    vegetarian,
    nut,
    gluten,
    city,
    street,
    zipCode,
    dillPay,
    guestOrder,
    selfService,
    earningPercentage,
    serviceTime,
    priceRange,
    lat,
    long,
    isCompleted,
  } = useSelector((state) => state.details);
  const workingHours = useSelector((state) => state.workingHours);


  const [selectedCountry, setSelectedCountry] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCountryChange = (selectedOption) => {
    dispatch(setCountry(selectedCountry));
    setSelectedCountry(selectedOption);
  };

  const onInputChanged = (type, value) => {
    dispatch(
      setInput({
        type: type,
        value: value,
      })
    );
  };

  const onCheckInputChanged = (type, value) => {
    dispatch(
      setInput({
        type: type,
        value: !value,
      })
    );
  };

  const handleSubmit = async () => {
    if (!name || !type || !description) {
      setErrorMessage(
        "Please fill in all required fields (Name, type, and Description)."
      );
      setSuccessMessage(null);
      return;
    }
    const restaurantData = {
      name,
      type,
      description,
      workingHours,
      zipCode,
      dairy,
      vegan,
      vegetarian,
      nut,
      gluten,
      city,
      street,
      dillPay,
      guestOrder,
      selfService,
      earningPercentage,
      serviceTime,
      lat,
      long,
      priceRange,
    };
    try {
      await addDetails(restaurantData);
      setSuccessMessage("Restaurant details added successfully!");
      dispatch(setIsCompleted(true));
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        "Error adding restaurant details. Please try again later."
      );
      setSuccessMessage(null);
      console.error("Error adding restaurant details:", error);
    }
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [selectedCountry]
  );
  return (
    <div className="md:w-[75%]">
      <Header
        title="Setup Your Restaurant"
        subtitle="A quick setup for your restaurant at dill"
        center
      />
      <div>
        <Header secondary title={"Restaurant's Info"} />
        <Input
          id="name"
          type="text"
          label="Restaurant Name"
          placeholder="Savoria Bistro"
          value={name}
          onChange={(e) => onInputChanged("name", e.target.value)}
        />
        <Input
          id="type"
          type="text"
          label="Restaurant Type"
          placeholder="Seafood"
          value={type}
          onChange={(e) => onInputChanged("type", e.target.value)}
        />
        <Input
          id="description"
          type="text"
          label="Restaurant Description"
          placeholder="description..."
          value={description}
          onChange={(e) => onInputChanged("description", e.target.value)}
          multiline
        />

        <WorkingHours />

        <div className="my-10">
          <Range
            min={0}
            max={4}
            label="Price Range:"
            price
            value={priceRange}
            onChange={(e) => onInputChanged("priceRange", e)}
          />
        </div>

        <Header secondary title={"Restaurant's Allergies"} />

        <div className="grid grid-cols-2">
          <CheckboxInput
            label="Dairy"
            value={dairy}
            onChange={() => onCheckInputChanged("dairy", dairy)}
          />
          <CheckboxInput
            label="Gluten"
            value={gluten}
            onChange={() => onCheckInputChanged("gluten", gluten)}
          />
          <CheckboxInput
            label="Vegan"
            value={vegan}
            onChange={() => onCheckInputChanged("vegan", vegan)}
          />
          <CheckboxInput
            label="Nut"
            value={nut}
            onChange={() => onCheckInputChanged("nut", nut)}
          />
          <CheckboxInput
            label="Vegetarian"
            value={vegetarian}
            onChange={() => onCheckInputChanged("vegetarian", vegetarian)}
          />
        </div>
        <div className="mt-5">
          <Header secondary title={"Restaurant's Address"} />
          <Input
            id="city"
            value={city}
            onChange={(e) => onInputChanged("city", e.target.value)}
            type="text"
            label="City"
            placeholder="city"
          />
          <Input
            id="street"
            value={street}
            onChange={(e) => onInputChanged("street", e.target.value)}
            type="text"
            label="Street Address"
            placeholder="street"
          />
          <Input
            id="zip-code"
            value={zipCode}
            onChange={(e) => onInputChanged("zipCode", e.target.value)}
            type="number"
            label="Zip Code"
            placeholder="1234"
          />
        </div>

        {/* Location */}
        <div>
          {/* <CountrySelect value={country} onChange={handleCountryChange} /> */}
          <div className="mb-5">
            <Header secondary title={"Restaurant's Location"} />
          </div>
          <Map center={selectedCountry?.latlng} />
        </div>

        {/* Earning Percentage */}
        <div>
          <Header title="Earning Percentage" secondary />
          <Range
            label="%"
            max="50"
            value={earningPercentage}
            onChange={(e) => onInputChanged("earningPercentage", e)}
          />
          <div className="flex md:justify-center md:items-center">
            <div className="md:flex gap-10">
              <CheckboxInput
                label="dill pay"
                value={dillPay}
                onChange={() => {
                  onCheckInputChanged("dillPay", dillPay);
                }}
              />
              <CheckboxInput
                label="Guest ordering"
                value={guestOrder}
                onChange={() => {
                  onCheckInputChanged("guestOrder", guestOrder);
                }}
              />
              <CheckboxInput
                label="Self service"
                value={selfService}
                onChange={() => {
                  onCheckInputChanged("selfService", selfService);
                }}
              />
            </div>
          </div>
        </div>

        {/* Optimal Service Time */}
        <div className="my-10">
          <Header
            title="Optimal Service Time"
            subtitle="Default wait time in minutes"
            secondary
          />
          <Input
            id="default-wait-time"
            label="Default wait time"
            type="number"
            value={serviceTime}
            onChange={(e) => onInputChanged("serviceTime", e.target.value)}
          />
        </div>
        <div className="mt-10 mb-5">
          <Button name="Submit" onClick={handleSubmit} />
        </div>
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
export default Details;
