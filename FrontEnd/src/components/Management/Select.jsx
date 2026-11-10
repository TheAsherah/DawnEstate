"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { FiList } from "react-icons/fi";
import { BiTask } from "react-icons/bi";

import { AiOutlineUserAdd } from "react-icons/ai";

const Select = ({
  AddBooking = "Add blog",
  ShowRequests = "Show Blogs",
 
  activeTab,
  onTabChange,
  ...props
}) => {
  
  const tabs = [
    { name: AddBooking, icon: <AiOutlinePlus className="mr-2 text-[17px]" />, value: "Add blog" },
    { name: ShowRequests, icon: <FiList className="mr-2 text-[17px]" />, value: "Show Blogs" },
  ];

  return (
    <div {...props} className="w-full h-[60px] py-2 mb-2 text-gray-800 flex justify-between bg-gradient-to-br from-beige-100 via-blue-100 to-green-100">
      <div className="w-[95%] m-auto">
        <nav className="bg-white  bg-opacity-90 rounded-[15px] w-full shadow-sm  backdrop-blur-sm">
          <ul className="flex w-full justify-around list-none">
            {tabs.map(({ name, icon, value }) => (
              <li key={value} className="relative w-[25%]">
                <div 
                  onClick={() => onTabChange(value)}
                  className={`flex items-center justify-center p-4 h-[60px] cursor-pointer font-semibold transition-all duration-300
                    ${activeTab === value ? "text-green-600" : "text-gray-700"}
                    hover:text-green-500`}
                >
                  {icon}
                  <span>{name}</span>
                </div>
                
               
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Select;