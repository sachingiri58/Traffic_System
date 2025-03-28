import React, { useState } from "react";

const InputSection = ({ inputs, onInputChange }) => {
  const [previews, setPreviews] = useState(inputs.map(() => null));

  const handleFileChange = (index, event) => {
    const file = event.target.files ? event.target.files[0] : null;

    // Update the preview for the specific frame
    const updatedPreviews = [...previews];
    updatedPreviews[index] = file ? URL.createObjectURL(file) : null;
    setPreviews(updatedPreviews);

    // Pass the file to the parent component
    onInputChange(index, file);
  };

  return (
    <div className="flex flex-col  gap-4 images  ">
      {/* First button at the top */}
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-32 border border-gray-300 rounded overflow-hidden flex items-center justify-center">
          {previews[0] ? (
            <img
              src={previews[0]}
              alt="Preview 1"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-sm">Select an image/video</span>
          )}
          <input
            type="file"
            id="input-0"
            onChange={(e) => handleFileChange(0, e)}
            accept="image/,video/"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        {previews[0] && (
          <button
            className="mt-2 text-red-500 text-sm"
            onClick={() => {
              const updatedPreviews = [...previews];
              updatedPreviews[0] = null;
              setPreviews(updatedPreviews);
              onInputChange(0, null);
            }}
          >
            Lane 1
          </button>
        )}
      </div>

      {/* Second and third buttons in a horizontal row */}
      <div className="flex justify-center space-x-32 ">
        {[1, 2].map((index) => (
          <div key={index} className="flex flex-col  items-center">
            <div className="relative w-40 h-32 border border-gray-300 rounded overflow-hidden flex items-center justify-center">
              {previews[index] ? (
                <img
                  src={previews[index]}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">
                  Select an image/video
                </span>
              )}
              <input
                type="file"
                id={`input-${index}`}
                onChange={(e) => handleFileChange(index, e)}
                accept="image/,video/"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {previews[index] && (
              <button
                className="text-red-500 text-sm"
                onClick={() => {
                  const updatedPreviews = [...previews];
                  updatedPreviews[index] = null;
                  setPreviews(updatedPreviews);
                  onInputChange(index, null);
                }}
              >
                Lane  {index+1}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Last button at the bottom */}
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-32 border border-gray-300 rounded overflow-hidden flex items-center justify-center">
          {previews[3] ? (
            <img
              src={previews[3]}
              alt="Preview 4"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-sm">Select an image/video</span>
          )}
          <input
            type="file"
            id="input-3"
            onChange={(e) => handleFileChange(3, e)}
            accept="image/,video/"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        {previews[3] && (
          <button
            className=" text-red-500 text-base"
            onClick={() => {
              const updatedPreviews = [...previews];
              updatedPreviews[3] = null;
              setPreviews(updatedPreviews);
              onInputChange(3, null);
            }}
          >
            Lane 4
          </button>
        )}
      </div>
    </div>
  );
};

export default InputSection;