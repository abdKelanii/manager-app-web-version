"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMenuImages } from "../../redux/stepper/menuSlice";
import { setRestuarantImagesImages } from "../../redux/stepper/brandingSlice";

export default function FileUpload({ reduxState }) {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const validFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file && isImageFile(file)) {
        validFiles.push(file);
      }
    }
    if (validFiles.length > 0) {
      setFiles(validFiles);

      if (reduxState === "menuImages") {
        validFiles.forEach((file) => {
          dispatch(setMenuImages(file));
        });
      } else if (reduxState === "brandingImages") {
        validFiles.forEach((file) => {
          dispatch(setRestuarantImagesImages(file));
        });
      }
    }
  };

  const isImageFile = (file) => {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    return file && acceptedImageTypes.includes(file.type);
  };

  return (
    <div className="my-5">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="file_input"
      >
        Upload Image
      </label>
      <input
        className="block w-full file:bg-blue-500 text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        aria-describedby="file_input_help"
        id="image_input"
        type="file"
        onChange={handleFileChange}
        accept="image/jpeg, image/png, image/gif, image/svg+xml"
        multiple
      />
      <p
        className="mt-1 text-xs text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG, or GIF (MAX. 800x400px).
      </p>
      {files.length > 0 && (
        <div>
          <p>Selected files:</p>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
