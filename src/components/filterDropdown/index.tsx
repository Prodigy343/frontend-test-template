import { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";

interface FilterDropdownProps {
  options: string[];
  selectedOption: string | null;
  setSelectedOption: (option: string) => void;
}

export const FilterDropdown: FC<FilterDropdownProps> = ({ options = [], selectedOption = "", setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event.target instanceof Node) {
        if (!dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex flex-row items-center gap-2 md:gap-4 w-full md:w-auto justify-end pb-12">
      <span className="text-sm font-semibold text-gray-900">Genre</span>
      <div className="hidden md:block w-px bg-gray-300 h-5"></div>
      <div className="relative w-full md:w-auto" ref={dropdownRef}>
        <button
          className="flex justify-between items-center w-full md:w-[220px] bg-white text-sm text-gray-900 px-4 py-2 rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedOption}</span>
          <Image
            src="/images/arrow-down.svg"
            alt="arrow down"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </button>
        
        {isOpen && (
          <ul className="absolute left-0 z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
            {options.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 ${
                  selectedOption === option ? "font-semibold text-indigo-600" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};