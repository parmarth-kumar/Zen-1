import React from 'react';
//Add lightbulb
import { X, Mapin, Timer, User, Sparkles, ExternalLink, Lightbulb } from 'lucide-react';
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
                {categories && <category.icon className="w-5 h-5 text-blue-400" />}
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
                  className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 border border-slate-700 rounded-lg text-blue-300 hover:text-blue-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4"/>
                  <span>Read Full Publication on NCBI</span>
                </a>
              )}

              
            </div>
          </div>
        </div>
      </div>
    </div>
