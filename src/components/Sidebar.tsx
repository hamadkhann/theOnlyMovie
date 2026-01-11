interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

import React, { Children } from "react";

export const Sidebar = ({ isOpen, onClose, children }: SidebarProps) => {
  return (
    <div className={`fixed inset-0 z-40 ${isOpen ? "visible" : "invisible"}`}>
      {/* Overlay/Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed left-0 top-16 h-full w-72 bg-gradient-to-b from-gray-900 to-black shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <h2 className="text-white text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-sm">
              Menu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>
        {/* Content Area */}
        <div className="overflow-y-auto h-[calc(100%-88px)] p-6 ">
          {children}
        </div>
      </div>
    </div>
  );
};
