"use client";

import MenuItem from "../MenuItem";
import Button from "../ui/Button";
import Header from "../ui/Header";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addMenuItem } from "../../firebase/databaseServices";

const Menu = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const {itemName,itemPrice,description,cookTime,dairy,vegan,vegetarian,gluten,nut,
    selectedMenuItemType,selectedSideItemId, sideItems,stations,
  } = useSelector((state) => state.menu);

  const { addedQuestions, selectedQId, answers } = useSelector(
    (state) => state.menu
  );
  const categoryInfoList = useSelector((state) => state.categories.list);
  const { selectedCategoryId } = useSelector((state) => state.categories);
  const menuImages = useSelector((state) => state.menu.menuImages);

  const handleSubmit = async () => {
    if (!itemName || !itemPrice || !description) {
      setErrorMessage(
        "Please fill in all required fields (Item Name, Item Price, and Description)."
      );
      setSuccessMessage(null);
      return;
    }
    try {
      const menuData = {itemName,itemPrice,description,cookTime,dairy,vegan,
        vegetarian,gluten,nut,sideItems,categoryInfoList,selectedCategoryId,addedQuestions,
        selectedQId,answers,menuImages,stations,
      };
      
      await addMenuItem(menuData, selectedMenuItemType);
      setSuccessMessage("Menu item added successfully!");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error adding menu item. Please try again.");
      setSuccessMessage(null);
      console.error("Error adding menu item:", error);
    }
  };
  return (
    <div className="md:w-[75%]">
      <div className="w-full flex justify-center items-center ">
        <Header title="Setup Your Menu" />
      </div>

      {/* Menu Item */}
      <div className="mb-10">
        <MenuItem MenuName="Menu Item" />
      </div>

      <div className="mt-10 mb-5">
        <Button name="Add item to the menu" onClick={handleSubmit} />
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

export default Menu;
