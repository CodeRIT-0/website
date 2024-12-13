import React from 'react';

const DottedLoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative flex items-center justify-center">
   
        <div className="relative w-20 h-20">
         
          <div className="absolute inset-0 border-4 border-dotted border-blue-100 rounded-full"></div>
          
         
          <div className="absolute inset-0 border-4 border-dotted border-blue-600 border-t-transparent border-r-transparent animate-spin rounded-full"></div>
        </div>
        
        
        <div className="absolute w-24 h-24 border-2 border-dotted border-blue-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default DottedLoadingSpinner;