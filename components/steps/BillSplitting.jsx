"use client";

import Header from "../ui/Header";
import Range from "../inputs/Range";
import Button from "../ui/Button";
import { setInput } from "../../redux/stepper/detailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addBillSplitting } from "../../firebase/databaseServices";

const BillSplitting = () => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); 
  const {
    restaurantAndStaff,
    BoHAndFoH,
    waitersAndTableWaiters,
    chefsAndTableChaefs,
  } = useSelector((state) => state.details);

  const onInputChanged = (type, value) => {
    dispatch(
      setInput({
        type: type,
        value: value,
      })
    );
  };

  const handleSubmit = async () => {
    try {
      const BillSplittingData = {
        restaurantAndStaff,
        BoHAndFoH,
        waitersAndTableWaiters,
        chefsAndTableChaefs,
      };

      await addBillSplitting(BillSplittingData);

      setSuccessMessage("Tip splitting updated successfully!");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        "Error updating tip splitting. Please try again later."
      );
      setSuccessMessage(null);
      console.error("Error updating tip splitting:", error);
    }
  };

  return (
    <div>
      <Header title="Bill Splitting" secondary />
      <div>
        <div>
          <h4>Split Between restaurant and staff</h4>
          <Range
            bill
            min={1}
            max={9}
            value={restaurantAndStaff}
            onChange={(e) => {
              onInputChanged("restaurantAndStaff", e);
            }}
          />
        </div>
        <div>
          <h4>Split Between BoH and FoH</h4>
          <Range
            bill
            min={1}
            max={9}
            value={BoHAndFoH}
            onChange={(e) => {
              onInputChanged("BoHAndFoH", e);
            }}
          />
        </div>
        <div>
          <h4>Split Between waiters and and table waiters</h4>
          <Range
            bill
            min={1}
            max={9}
            value={waitersAndTableWaiters}
            onChange={(e) => {
              onInputChanged("waitersAndTableWaiters", e);
            }}
          />
        </div>
        <div>
          <h4>Split Between chefs and table chaefs</h4>
          <Range
            bill
            min={1}
            max={9}
            value={chefsAndTableChaefs}
            onChange={(e) => {
              onInputChanged("chefsAndTableChaefs", e);
            }}
          />
        </div>
      </div>

      <div className="mt-10 mb-5">
        <Button name="Update tip splitting" onClick={handleSubmit} />
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

export default BillSplitting;
