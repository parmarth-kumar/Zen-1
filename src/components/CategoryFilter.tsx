import React, {useState} from "react";
import {Filter, ChevronDown} from 'lucide-react';
import{categories} from '../data/research-data';

//props for CategoryFilter
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;//callback when user selects a category
}

const CategoryFilter: React.FC<CategoryFilterProps>= ({ selectedCategory,onCategoryChange})=>{
  //state for dropdown visibility
  const[isOpen,setIsOpen]= useState(false);
//the full category object for the selected category
const selectedCategoryData = categories.find(cat =>cat.id === selectedCategory);
return(
  <div className="relative inline-block">
    {/*--- Glassy Main Button ---*/}
    <button
      onClick ={()=> setIsOpen(!isOpen)}
      className="flex items-center space-x-2 px-3 py-1.5
       bg-gray-900/40 backdrop-blur-lg
       border border-gray-800/60
       rounded-xl cursor-pointer hover:bg-gray-900/60
       transition-all shadow-md"
      >
      {/*Left-side filter icon for clarity*/}
      <Filter className ="w-4 h-4 text-gray-300"/>

      {/* Display the selected category name, or fallback if none*/}
      <span className ="text-sm font-medium text-white">
        {selectedCategoryData?.name || 'All Research'}
      </span>
      {/* Chevron rotates when dropdown is open*/}
      <ChevronDown
        className={`w-4 h-4 text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

    {/*--- Dropdown Menu (conditionally rendered if open)---*/}
    
      {isOpen && (
          <div
            className="absolute top-full right-0 mt-2 w-52 
            bg-gray-900/40 
            backdrop-blur-lg
            border border-gray-800/60 rounded-xl shadow-xl z-50"
            >
               <div className="p-1">
                 {/* map over all categories to show them as dropdown option*/}
                 {categories.map(category => (
                       <button
                         key={category.id}
                         onClick={() => {
                           onCategoryChange(category.id);//notify parent of category selection 
                           setIsOpen(false); //close dropdown
                         }}
                         className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-all 
                         ${selectedCategory === category.id
                           ? 'bg-cyan-500/20 text-cyan-300 shadow-inner border border-cyan-400/30'
                           : 'hover:bg-gray-900/10 text-gray-200 hover:text-white'
                         }`}
                         >
                         {/*Category icon (dynamically passed from data)*/}
                          <category.icon className="w-4 h-4 flex-shrink-0"/>

                         {/*Category name*/}
                          <span className ="text-sm font-medium truncate">{category.name}</span>
                         </button>
                     ))}
                 </div>
               </div>
           )}
        </div>
      );
};

export default CategoryFilter;

