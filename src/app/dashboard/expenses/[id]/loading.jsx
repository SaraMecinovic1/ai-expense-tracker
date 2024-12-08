import React from "react";
import { RefreshCw } from "lucide-react"; // Ikona za animaciju

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <RefreshCw className="animate-spin h-8 w-8 text-blue-500 mb-4" />
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
}

export default Loading;
