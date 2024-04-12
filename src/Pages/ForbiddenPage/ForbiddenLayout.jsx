
import React from 'react';

const ForbiddenLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      {children}
    </div>
  );
};

export default ForbiddenLayout;
