"use client";
import { useState } from "react";
import { Upload, CameraIcon, X } from "lucide-react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate upload progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        if (currentProgress >= 45) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
      <div className="flex justify-between mb-4">
        <button className="flex items-center text-gray-700">
          <Upload className="w-5 h-5 mr-2" />
          My Device
        </button>
        <button className="flex items-center text-gray-400">
          <CameraIcon className="w-5 h-5 mr-2" />
          Take Photo
        </button>
      </div>
      <div className="border-t border-gray-200 mb-4"></div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4">
        <div className="text-center">
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-lg mb-1">
            Drag and drop or <span className="text-blue-500">choose file</span>
          </p>
          <p className="text-gray-400">JPEG, PNG, PDF, MP4, MOV</p>
        </div>
      </div>
      {file && (
        <div>
          <p className="font-semibold mb-2">1 File</p>
          <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">{file.size} KB</p>
              </div>
            </div>
            <button>
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full">
            <div
              className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button className="px-4 py-2 border border-gray-300 rounded-lg">
          Cancel
        </button>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">
          Upload
        </button>
      </div>
    </div>
  );
}
