
import React, { useRef, ChangeEvent } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { UploadIcon } from './icons/UploadIcon';

interface ImageInputProps {
  onImageSubmit: (file: File) => void;
  isLoading: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSubmit, isLoading }) => {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onImageSubmit(file);
    }
  };

  const triggerUpload = () => {
    uploadInputRef.current?.click();
  };

  const triggerCamera = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="file"
          accept="image/*"
          ref={uploadInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        
        <button
          onClick={triggerUpload}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <UploadIcon className="w-6 h-6 mr-3" />
          Upload Photo
        </button>
        
        <button
          onClick={triggerCamera}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          <CameraIcon className="w-6 h-6 mr-3" />
          Take Photo
        </button>
      </div>
    </div>
  );
};

export default ImageInput;
