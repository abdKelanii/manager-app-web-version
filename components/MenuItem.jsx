"use client";

import Input from "./inputs/Input";
import SelectInput from "./inputs/SelectInput";
import CheckboxInput from "./inputs/CheckboxInput";
import Header from "./ui/Header";
import Button from "./ui/Button";
import FileUpload from "./inputs/FileUpload";
import AddCategories from "./inputs/AddCategrires";
import AddQuestion from "./inputs/AddQuestion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInput,
  setSelectedMenuItemType,
  addNewSideItem,
  setSelectedSideItem,
  setStations,
} from "../redux/stepper/menuSlice";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { v4 } from "uuid";

export const uploadImages = async (menuImagesArray) => {
  const downloadURLs = [];

  try {
    for (const menuImages of menuImagesArray) {
      const imageRef = ref(storage, `menuImages/${menuImages.name + v4()}`);
      await uploadBytes(imageRef, menuImages);
      const downloadURL = await getDownloadURL(imageRef);
      downloadURLs.push(downloadURL);
    }

    return downloadURLs;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

const MenuItemsOption = [
  "Special",
  "Starter",
  "Main",
  "Dessert",
  "Dessert",
  "Drink",
  "Side",
];

const MenuItem = ({ MenuName }) => {
  const [allCategories, setAllCategories] = useState([]);
  const dispatch = useDispatch();
  const {
    itemName,
    itemPrice,
    description,
    cookTime,
    dairy,
    vegan,
    vegetarian,
    gluten,
    nut,
    selectedMenuItemType,
    selectedSideItemId,
    sideItems,
  } = useSelector((state) => state.menu);
  const AllCategories = useSelector((state) => state.categories.list);
  const addedStations = useSelector((state) => state.BoH);

  const onInputChanged = (type, value) => {
    dispatch(
      setInput({
        type: type,
        value: value,
      })
    );
  };

  const handleAddCategory = (newCategory) => {
    setAllCategories([...allCategories, newCategory]);
  };

  const [newSideItem, setNewSideItem] = useState("");

  const handleAddSideItem = () => {
    if (newSideItem) {
      dispatch(addNewSideItem(newSideItem));
      setNewSideItem("");
    }
  };

  const handleSelectedSideItemChange = (selectedItemId) => {
    dispatch(setSelectedSideItem(selectedItemId));
  };

  const handleMenuItemTypeChange = (selectedType) => {
    dispatch(setSelectedMenuItemType(selectedType));
  };

  const onCheckInputChanged = (type, value) => {
    dispatch(
      setInput({
        type: type,
        value: !value,
      })
    );
  };
  const onStationChanged = (type, value) => {
    dispatch(
      setStations({
        type: type,
        value: !value,
      })
    );
  };

  return (
    <div className="">
      <Header title={MenuName} secondary />
      <SelectInput
        data={MenuItemsOption}
        label="Menu Item Type"
        value={selectedMenuItemType}
        onChange={(e) => handleMenuItemTypeChange(e.target.value)}
      />
      {/* Add Categories */}
      <AddCategories onAddCategory={handleAddCategory} />

      <div className="md:flex justify-between gap-x-5">
        <div className="flex-1">
          <Input
            label="Item's name"
            type="text"
            placeholder="Enter a name..."
            value={itemName}
            onChange={(e) => onInputChanged("itemName", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Item's price $"
            type="number"
            placeholder="Enter a price..."
            value={itemPrice}
            onChange={(e) => onInputChanged("itemPrice", e.target.value)}
          />
        </div>
      </div>
      <Input
        label="Description"
        type="text"
        multiline
        placeholder="Item's description"
        value={description}
        onChange={(e) => onInputChanged("description", e.target.value)}
      />
      <SelectInput
        data={AllCategories.map((category) => category.categoryName)}
        label="Select Category"
      />
      <Input
        label="Cook time in minutes"
        type="number"
        placeholder="10 min.."
        value={cookTime}
        onChange={(e) => onInputChanged("cookTime", e.target.value)}
      />
      <div>
        <h4>Item's allergies</h4>
        <div className="grid grid-cols-2 grid-rows-3">
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
      </div>

      <FileUpload reduxState="menuImages"/>

      {/* Stations */}

      {addedStations.length >= 1 && <Header title="Stations" secondary />}
      <div>
        {addedStations.map((station) => (
          <CheckboxInput
            key={station.id}
            label={station.name}
            value={station.isChecked}
            className="flex text-white my-3 justify-center items-center p-3 rounde d-full border-2 bg-green-500 hover:bg-green-600 cursor-point er border-gray-100"
            onChange={() => onStationChanged(station.name, station.isChecked)}
          />
        ))}
      </div>
      {/* Side Item Section */}
      <div>
        <Header secondary title="Side Items" subtitle="(optional)" />
        <SelectInput
          className="w-full p-4 font-light bg-white border-2 border-gray-200 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"
          value={selectedSideItemId}
          onChange={(e) => handleSelectedSideItemChange(e.target.value)}
          data={sideItems}
        />
        <div className="md:flex md:justify-between md:items-center gap-x-3">
          <div className="md:basis-2/3">
            <Input
              label="Add new side item"
              type="text"
              id="menu-item-question"
              placeholder="Enter a side item"
              value={newSideItem}
              onChange={(e) => setNewSideItem(e.target.value)}
            />
          </div>
          <div className="md:basis-1/3">
            <Button name="Add Side Item" onClick={handleAddSideItem} />
          </div>
        </div>
      </div>

      <AddQuestion />
    </div>
  );
};

export default MenuItem;
