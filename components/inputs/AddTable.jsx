"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTable,
  editTable,
  deleteTable,
  setChairsNumber,
  setTableNumber,
} from "../../redux/tables/tablesSlice";
import Input from "./Input";
import Header from "../ui/Header";
import Button from "../ui/Button";
import Modal from "../Modal";

function AddTable() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [editedTableNumber, setEditedTableNumber] = useState("");
  const [editedChairsNumber, setEditedChairsNumber] = useState("");
  const tableInfoList = useSelector((state) => state.table.list);
  const { tableNumber, chairsNumber, list } = useSelector(
    (state) => state.table
  );

  const dispatch = useDispatch();

  function handleClick() {
    if (!tableNumber || !chairsNumber) {
      alert("Please fill in both Table Number and Chairs Number.");
      return;
    }
    const tableNumberExists = tableInfoList.some(
      (info) => info.tableNumber === tableNumber
    );
    if (tableNumberExists) {
      alert(`Table with number ${tableNumber} already exists.`);
      return;
    }
    dispatch(addTable({ id: Date.now(), tableNumber, chairsNumber }));
    dispatch(setTableNumber(""));
    dispatch(setChairsNumber(""));
  }

  function handleDelete() {
    dispatch(deleteTable(selectedTableId));
    setOpenModal(false);
  }

  function handleEdit() {
    if (selectedTableId !== null) {
      dispatch(
        editTable({
          id: selectedTableId,
          tableNumber: editedTableNumber,
          chairsNumber: editedChairsNumber,
        })
      );
      setOpenModal(false);
    }
  }

  

  return (
    <div className="mb-5">
      <Header title="Adding Tables" secondary />
      <div className="">
        <div className="md:flex md:justify-between md:items-center gap-x-3">
          <div className="basis-1/3">
            <Input
              id="table-number"
              type="number"
              label="Table Number"
              placeholder=""
              value={tableNumber}
              onChange={(e) => dispatch(setTableNumber(e.target.value))}
            />
          </div>
          <div className="basis-1/3">
            <Input
              id="chairs-number"
              type="number"
              label="Chairs Number"
              placeholder=""
              value={chairsNumber}
              onChange={(e) => dispatch(setChairsNumber(e.target.value))}
            />
          </div>
          <div className="basis-1/3">
            <Button name="Add table" onClick={handleClick} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        {tableInfoList.map((info, index) => (
          // table Element
          <div
            key={index}
            onClick={() => {
              setSelectedTableId(info.id);
              setEditedTableNumber(info.tableNumber);
              setEditedChairsNumber(info.chairsNumber);
              setOpenModal(true);
            }}
            className="mt-4 cursor-pointer p-3 rounded-md flex justify-center items-center text-white bg-blue-700"
          >
            <p>
              Table: {info.tableNumber}, Chairs: {info.chairsNumber}
            </p>
          </div>
        ))}
      </div>

      

      {openModal && (
        <Modal closeModal={setOpenModal}>
          <div className="w-full flex justify-center">
            <h2 secondary className="text-2xl font-bold">
              Edit Table
            </h2>
          </div>
          <div className=" mt-10">
            <div className="flex gap-x-5">
              <div className="flex-1">
                <Input
                  id="table-number"
                  type="number"
                  label="Table Number"
                  value={editedTableNumber}
                  onChange={(e) => setEditedTableNumber(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  id="chairs-number"
                  type="number"
                  label="Chairs Number"
                  value={editedChairsNumber}
                  onChange={(e) => setEditedChairsNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="my-10 flex justify-center items-center gap-5 text-black">
            <Button name="Edit" onClick={handleEdit} />
            <Button name="Delete" red onClick={handleDelete} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AddTable;
