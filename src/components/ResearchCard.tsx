import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { ResearchItem, categories } from '../data/research-data';

interface ResearchCardProps {
  research: ResearchItem;
  onClick: (research: ResearchItem) => void;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ research, onClick }) => {
  const category = categories.find(cat => cat.id === research.category);
  
  return (
    <div 
      className="bg-slate-900/60 border backdrop-blur-sm border-slate-800 rounded-xl p-6 hover:border-gray-700/50 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/10 flex flex-col h-full"
      onClick={() => onClick(research)}
    >
      <div className="flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {category && <category.icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
            <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-400/20 rounded-full text-xs font-medium text-cyan-300">
              {category?.name}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
        </div>

        <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
          {research.title}
        </h3>

        <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {research.summary}
        </p>
      </div>

      <div className="flex-shrink-0">
        {/* SIMPLIFIED: Display only the year as the primary metadata */}
        <div className="flex items-center space-x-1 text-xs text-slate-500 mb-4">
          <Calendar className="w-3 h-3" />
          <span>{research.year}</span>
        </div>

        {/* The keyword logic is perfect, no changes needed */}
        <div className="flex flex-wrap gap-1">
          {research.keywords && research.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-1 bg-slate-800/50 rounded-full text-xs text-slate-400"
            >
              {keyword}
            </span>
          ))}
          {research.keywords && research.keywords.length > 3 && (
            <span className="px-2 py-1 bg-slate-800/50 rounded-full text-xs text-slate-400">
              +{research.keywords.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;
