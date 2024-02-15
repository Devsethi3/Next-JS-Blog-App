"use client";
import { useState } from "react";
import Image from "next/image";

const UploadImage = ({ setFile }) => {
  const [selectedFile, setSelectedFile] = useState();
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-[50vh] lg:h-[75vh] border-2 border-dashed rounded-lg cursor-pointer upload-input"
        >
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-[80px] h-[80px] text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-xl text-gray-500 mt-4 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          ) : null}
          {selectedFile ? (
            <Image
              src={window.URL.createObjectURL(selectedFile)}
              width={500}
              height={800}
              alt="selected-image"
              className="object-contain p-2 w-full h-[90%]  "
            />
          ) : null}
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
              setSelectedFile(e.target.files[0]);
            }}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default UploadImage;
