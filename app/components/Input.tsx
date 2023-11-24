"use client";
import React, { useState, useRef, useEffect } from "react";

interface Input {
  value: string;
  onChange: (e: any) => void;
  dropdownItems: string[];
  selectedItem: string;
  onDropdownChange: (e: any) => void;
  disabled?: boolean;
}

const Input = ({
  value,
  onChange,
  dropdownItems,
  selectedItem,
  onDropdownChange,
  disabled = false,
}: Input) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleClickOutside = () => {
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownStyle = {
    transition: "all 0.3s ease-in-out",
    opacity: dropdownOpen ? 1 : 0,
    maxHeight: dropdownOpen ? "300px" : "0px",
  };

  return (
    <div className="flex relative">
      <div className="relative w-full">
        <input
          type="number"
          step="0.01"
          id="search-dropdown"
          className="block p-3 w-full z-20 text-xl text-gray-700 bg-gray-50 rounded-s-lg border-s-gray-50 border-s-2 border border-gray-300 focus:border-blue-500 light:bg-gray-700 light:border-s-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:border-blue-500 font-bold"
          placeholder="00,00"
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
        />
      </div>
      <button
        id="dropdown-button"
        data-dropdown-toggle="dropdown"
        className="gap-3 ring-0 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-xl font-bold text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-100 light:bg-white light:hover:bg-white-100 light:text-white light:border-gray-600"
        type="button"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        {selectedItem}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="5"
          viewBox="0 0 10 5"
          fill="none"
        >
          <path
            d="M5.08772 4.91228L10 0H0.175439L5.08772 4.91228Z"
            fill="#D9D9D9"
          />
        </svg>
      </button>
      <div
        id="dropdown"
        data-testid="dropdown"
        className="overflow-y-scroll absolute right-0 top-14 z-50 bg-white rounded-md w-1/3 text-center flex justify-center"
        style={dropdownStyle}
      >
        <ul
          className="py-2 text-md text-gray-700 light:text-gray-200 text-center"
          aria-labelledby="dropdown-button"
        >
          {dropdownItems.map((option) => {
            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={onDropdownChange}
                  className="font-bold inline-flex justify-center w-full px-2 py-1 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Input;
