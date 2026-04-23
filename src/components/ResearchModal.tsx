import React from 'react';
// ADDED Lightbulb back
import { X, MapPin, Timer, User, Sparkles, ExternalLink, Lightbulb } from 'lucide-react';
import { ResearchItem, categories } from '../data/research-data';

interface ResearchModalProps {
  research: ResearchItem;
  onClose: () => void;
}

const ResearchModal: React.FC<ResearchModalProps> = ({ research, onClose }) => {
  const category = categories.find(cat => cat.id === research.category);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header (No changes here) */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800/50 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <div className="flex items-center space-x-2 mb-3">
                {category && <category.icon className="w-5 h-5 text-blue-400" />}
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300">
                  {category?.name}
                </span>
                <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-400">
                  {research.year}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-100 mb-4">{research.title}</h1>
              
              {research.url && (
                <a
                  href={research.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 border border-slate-700 rounded-lg text-sm text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Read Full Publication on NCBI</span>
                </a>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {research.duration && research.duration !== 'N/A' && (
                  <div className="flex items-center space-x-1">
                    <Timer className="w-4 h-4" />
                    <span>{research.duration}</span>
                  </div>
                )}
                {research.location && research.location !== 'Space & Ground Studies' && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{research.location}</span>
                  </div>
                )}
                {research.organism && research.organism !== 'Various' && (
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{research.organism}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* UPDATED: AI Analysis Section with restored styling */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* RESTORED: The Lightbulb icon and yellow text */}
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-yellow-200">AI Analysis & Key Finding</h2>
            </div>
            {/* RESTORED: The decorative green bullet point styling for the summary */}
            <div className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-lg border border-slate-800/50">
              <div className="w-6 h-6 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              </div>
              <p className="text-gray-300 leading-relaxed">{research.summary}</p>
            </div>
          </div>
          
          {/* Keywords */}
          {research.keywords && research.keywords.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-100 mb-4">AI-Generated Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {research.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-2 bg-gray-800/50 border border-slate-700/50 rounded-lg text-sm text-gray-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchModal;
