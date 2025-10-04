//This is going to be a component file
import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
//Attach data file
import { ResearchItem, categories } from 'src/data/research-data.ts'

//Create interface
interface ResearchCardProps {
  research: ResearchItem;
  onClick: (research: ResearchItem) => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ research, onClick }) => {
  const category = categories.find(cat => cat.id === research.category);

  return(
    <div
      className= "bg-slate-900/60 border backdrop-blur-sm border-slate-800 rounded-xl p-6 hover:border-gray-700/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10 flex flex-col h-full"
      onClick={() => onClick(research)}
      >
    </div>
  




