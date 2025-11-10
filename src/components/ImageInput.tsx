import React, { ChangeEvent } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { UploadIcon } from './icons/UploadIcon';

interface ImageInputProps {
  onImageSubmit: (file: File) => void;
  isLoading: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSubmit, isLoading }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onImageSubmit(file);
      // Reset input value to allow re-selecting the same file
      event.target.value = '';
    }
  };

  const commonLabelClasses = "flex-1 inline-flex items-center justify-center px-6 py-4 font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out";
  const disabledClasses = "bg-gray-500 cursor-not-allowed";
  
  const uploadEnabledClasses = "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-opacity-75";
  const cameraEnabledClasses = "bg-teal-600 text-white hover:bg-teal-700 cursor-pointer focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-opacity-75";

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4">
        <label 
          htmlFor="upload-input"
          className={`${commonLabelClasses} ${isLoading ? disabledClasses : uploadEnabledClasses}`}
        >
          <UploadIcon className="w-6 h-6 mr-3" />
          Upload Photo
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            disabled={isLoading}
          />
        </label>
        
        <label 
          htmlFor="camera-input"
          className={`${commonLabelClasses} ${isLoading ? disabledClasses : cameraEnabledClasses}`}
        >
          <CameraIcon className="w-6 h-6 mr-3" />
          Take Photo
           <input
            id="camera-input"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="sr-only"
            disabled={isLoading}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageInput;