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
          <div className="flex items-center">
            <div className="flex items-center pl-4 pr-3">
              <Search className="w-5 h-5 text-gray-400"/>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e)=> onSearchChange(e.target.value)}
              //IMPROVED:More relavent placeholdertext
              placeholder="Search by title or keyword(e.g., radiation)"
              //ADDED:Aria-label for better accessibility
              aria-label="Search research papers"
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-2 py-3 focus:outline-none text-lg"
              />
            <div className ="flex items-center space-x-2 pr-2">
              <div className=" flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-lg border border-blue-500/30">
                <sparkles className="w-4 h-4 text-blue-400"/>
                {/*COMPLETED:added text to the AI tag*/}
                <span className="text-sm text-blue-300 font-medium">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

            
        
     



