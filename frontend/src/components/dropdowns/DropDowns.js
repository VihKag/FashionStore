import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownButton = ({
  title,
  items,
  height,
  width,
  widthDrop,
  iconRight,
  iconLeft,
  linkPath,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          type="button"
          className={`inline-flex justify-between w-full h-12 items-center gap-x-1.5 rounded-t-md bg-white px-3 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
          style={{ width: `${width}px`, height: `${height}px`}}
        >
          <div className="flex">
            <div className="mr-2">{iconLeft && iconLeft}</div>
            {title}
          </div>
          {iconRight && iconRight}
        </button>
      </div>
      {isOpen && (
        <div
          className={`absolute w-full left-0 z-50 rounded-b-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          style={{ width: `${widthDrop}px`}}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div role="none">
            {items.map((item, index) => (
              <div key={index}>
                  <Link
                    to={`${linkPath}${item.id}`}
                    className="text-gray-700 block px-4 py-2 text-base font-medium hover:bg-slate-200"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    {item.name}
                  </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
