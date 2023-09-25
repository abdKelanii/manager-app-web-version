"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStation, addStation } from "../../redux/stepper/BoHSlice";
import Button from "../ui/Button";
import SelectInput from "./SelectInput";
import Modal from "../Modal";

const StationsData = [
  { id: 1, name: "SAUTE", isChecked: false },
  { id: 2, name: "DESSERT", isChecked: false },
  { id: 3, name: "GRILL", isChecked: false },
  { id: 4, name: "OVEN", isChecked: false },
  { id: 5, name: "FRYER", isChecked: false },
  { id: 6, name: "SALAD", isChecked: false },
  { id: 7, name: "PREP", isChecked: false },
  { id: 8, name: "CUSTOM", isChecked: false },
];

const Stations = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [stationToDelete, setStationToDelete] = useState(null);
  const [stationToDeleteId, setStationToDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const addedStations = useSelector((state) => state.BoH);

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  const handleAddStation = () => {
    if (selectedStation === null || selectedStation === "Select...") {
      alert("Please select a station first");
    } else if (
      !addedStations.some((station) => station.name === selectedStation)
    ) {
      dispatch(addStation({ name: selectedStation }));
    }
  };

  const handleDeleteStation = () => {
    if (stationToDeleteId !== null) {
      dispatch(deleteStation(stationToDeleteId));
    }
    setOpenModal(false);
    setStationToDelete(null);
    setStationToDeleteId(null);
  };


  return (
    <div className="w-full my-5">
      <SelectInput
        data={StationsData.map((station) => station.name)}
        label="Choose Stations"
        onChange={handleStationChange}
      />
      <Button name="Add Station" onClick={handleAddStation} />
      <div className="w-full flex justify-center items-center">
        {addedStations.length > 0 && (
          <div className="w-[50%] mt-5">
            {addedStations.map((station) => (
              <div
                key={station.id}
                onClick={() => {
                  setStationToDelete(station.name);
                  setStationToDeleteId(station.id);
                  setOpenModal(true);
                }}
                className="flex text-white my-3 justify-center items-center p-3 rounded-full border-2 bg-green-500 hover:bg-green-600 cursor-pointer border-gray-100"
              >
                {station.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {openModal && (
        <Modal closeModal={() => setOpenModal(false)}>
          <div className="w-full flex justify-center">
            <h2 secondary className="text-2xl font-bold">
              Are you sure you want to delete station?
            </h2>
          </div>
          <div className="flex gap-x-5 mt-10">
            <Button name="Cancel" onClick={() => setOpenModal(false)} />
            <Button name="Delete" red onClick={handleDeleteStation} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Stations;