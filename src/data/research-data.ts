import { Leaf, Radiation, Heart, Globe, Microscope, Zap } from 'lucide-react';

// This interface now matches the structure of our AI-generated JSON
export interface ResearchItem {
  id: string;
  title: string;
  url: string;
  summary: string;
  category: string;
  keywords: string[];
  year: number;
  findings: string[];
  implications: string[];
  // ADD: Include the placeholder fields as optional properties for complete type safety
  organism?: string;
  experiment?: string;
  duration?: string;
  location?: string;
  methodology?: string;
  relatedStudies?: string[];
}

export interface Category {
  id:string;
  name: string;
  description: string;
  icon: any;
}

export const categories: Category[] = [
    { id: 'all', name: 'All Research', description: 'Browse all space biology research', icon: Globe },
    { id: 'plant-biology', name: 'Plant Biology', description: '', icon: Leaf }, // How plants grow and adapt in space
    { id: 'radiation-effects', name: 'Radiation Effects', description: '', icon: Radiation }, // Impact of cosmic radiation on living organisms
    { id: 'human-physiology', name: 'Human Physiology', description: '', icon: Heart }, // Changes in human body systems in space
    { id: 'microbiology', name: 'Microbiology', description: '', icon: Microscope }, // Behavior of microorganisms in space
    { id: 'cellular-biology', name: 'Cellular Biology', description: '', icon: Zap } // Cellular responses to space environment
];
