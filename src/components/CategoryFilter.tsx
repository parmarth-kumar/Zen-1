import React, {useState} from react;
import {Filter, ChevronDown} from 'lucide-react';
import{categories} from '../data/research-data';

//props for CategoryFilter
interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;//callback when user selects a category
}

const CategoryFilter: React.FC<CategoryFilterProps>= ({ selectedCategory,onCategoryChange})=>
  //state for dropdown visibility
  const[isOpen,setIsOpen]= useState(false);
//the full category object for the selected category
const selectedCategoryData = categories.find(cat =>cat.id === selectedCategory);
return(
  <div className="realtive inline-block">
    {/*--- Glassy Main Button ---*/}
    <button

