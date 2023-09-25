"use client";

import AddTable from "../inputs/AddTable";
import Header from "../ui/Header";
import Button from "../ui/Button";
import QRCode from "../../QRCode/src/index";
import { useState } from "react";
import { addTables } from "../../firebase/databaseServices";
import { useSelector } from "react-redux";

const FoH = () => {
  const [qr, setQr] = useState(false);
  const tableInfoList = useSelector((state) => state.table.list);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  function handleClick() {
    if (!qr) {
      setQr(true);
    } else {
      setQr(false);
    }
  }

  const handleSubmit = async () => {
    if (tableInfoList.length === 0) {
      setSubmitError("Please add at least one table before submitting.");
      setSubmitSuccess(null);
      return;
    }
    try {
      await addTables(tableInfoList);
      setSubmitSuccess("Tables submitted successfully!");
      setSubmitError(null);
    } catch (error) {
      setSubmitError("Error submitting tables. Please try again later.");
      setSubmitSuccess(null);
      console.error("Error submitting tables:", error);
    }
  };
  return (
    <div className="mt-10 md:w-[75%]">
      <div className="w-full flex justify-center items-center ">
        <Header title="FoH Setup" />
      </div>

      {/* Managing Tables */}
      <AddTable />

      <div className="mt-10">
        <Button name="Generate QR For the tables" onClick={handleClick} />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-36 my-10">
          {qr && <QRCode value="dill test qr code" />}
        </div>
      </div>
      <div className="mb-5">
        <Button name="Submit tables" onClick={handleSubmit} />
      </div>
      {submitSuccess && (
        <div className="flex justify-center items-center text-green-500">
          {submitSuccess}
        </div>
      )}
      {submitError && (
        <div className="flex justify-center items-center text-red-500">
          {submitError}
        </div>
      )}
    </div>
  );
};

export default FoH;
