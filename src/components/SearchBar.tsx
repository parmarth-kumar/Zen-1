import React from 'react';
import { Search,Sparkles} from 'lucide-react';

interface SearchBarProps{
  searchTerm:string;
  onSearchChange:(value:string)=> void;
  resultCount: number;
}

const SearchBar:React.FC<SeacrBarProps>=({searchTerm,onSearchChange,resultcount}) =>{
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative group">
        <div className ="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transtition-all duration-300 opacity-70 group-hover:opacity-100"/>
        <div className= "relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 group-hover:border-gray-600/50 transition-colors">
        
     
