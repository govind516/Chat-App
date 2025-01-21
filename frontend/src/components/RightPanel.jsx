import React from "react";

const RightPanel = () => {
  return (
    <div className="bg-gray-100 border-l border-gray-300 w-64 p-4 hidden lg:block">
      <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">
        Online Users
      </h3>
      <ul className="space-y-2">
        {/* Add online users list here */}
        <li className="text-gray-600 italic">No online users available</li>
      </ul>
    </div>
  );
};

export default RightPanel;
