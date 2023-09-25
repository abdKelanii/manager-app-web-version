"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  editCategory,
  deleteCategory,
  setCategoryDescriptionInput,
  setCategoryNameInput,
  setSelectedCategoryId,
} from "../../redux/categories/categoriesSlice";
import Input from "./Input";
import Button from "../ui/Button";
import Modal from "../Modal";

const AddCategories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [editedCategoryDescription, setEditedCategoryDescription] =
    useState("");

  const categoryInfoList = useSelector((state) => state.categories.list);
  const categoryNameInput = useSelector(
    (state) => state.categories.categoryNameInput
  );
  const categoryDescriptionInput = useSelector(
    (state) => state.categories.categoryDescriptionInput
  );
  const { selectedCategoryId } = useSelector((state) => state.categories )
  const dispatch = useDispatch();

  function handleClick() {
    if (!categoryNameInput || !categoryDescriptionInput) {
      alert("Please fill in both category name and description.");
      return;
    }

    const id = Date.now();
    dispatch(
      addCategory({
        id,
        categoryName: categoryNameInput,
        categoryDescription: categoryDescriptionInput,
      })
    );

    dispatch(setCategoryNameInput(""));
    dispatch(setCategoryDescriptionInput(""));
  }

  function handleDelete() {
    dispatch(deleteCategory(selectedCategoryId));
    setOpenModal(false);
  }

  function handleEdit() {
    if (selectedCategoryId !== null) {
      dispatch(
        editCategory({
          id: selectedCategoryId,
          categoryName: editedCategoryName,
          categoryDescription: editedCategoryDescription,
        })
      );
      setOpenModal(false);
    }
  }

  return (
    <div className="mt-5">
      <h4 className="font-bold">Add your categories</h4>
      <div className="justify-between gap-x-5">
        <div className="gap-x-3">
          <div className="flex-1">
            <Input
              id="category-name"
              type="text"
              label="Category Name"
              placeholder=""
              value={categoryNameInput}
              onChange={(e) => dispatch(setCategoryNameInput(e.target.value))}
            />
          </div>
          <div className="flex-1">
            <Input
              id="category-description"
              type="text"
              label="Category Description"
              placeholder=""
              multiline
              value={categoryDescriptionInput}
              onChange={(e) =>
                dispatch(setCategoryDescriptionInput(e.target.value))
              }
            />
          </div>
        </div>
        <div className="flex-1 w-full flex justify-center items-center">
          <Button name="Add category" onClick={handleClick} />
        </div>
      </div>

      <div className="flex-1 gap-3 mt-7 justify-center items-center">
        {categoryInfoList.map((info, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCategoryId(info.id);
              setEditedCategoryName(info.categoryName);
              setEditedCategoryDescription(info.categoryDescription);
              setOpenModal(true);
            }}
            className="mt-4 cursor-pointer p-3 rounded-md flex-1 justify-center items-center text-black bg-slate-100"
          >
            <p>
              <span className="font-medium text-lg">Category Name: </span>
              {info.categoryName}
            </p>
            <p className=" font-medium text-lg">Category Description:</p>
            <p>{info.categoryDescription}</p>
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
            <div className="gap-x-5">
              <div className="flex-1">
                <Input
                  id="category-name"
                  type="text"
                  label="Category Name"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  id="category-description"
                  type="text"
                  label="Category Description"
                  multiline
                  value={editedCategoryDescription}
                  onChange={(e) => setEditedCategoryDescription(e.target.value)}
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
};

export default AddCategories;
