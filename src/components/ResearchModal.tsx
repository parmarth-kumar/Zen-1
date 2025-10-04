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
        </div>
      </div>
    </div>
