import { useState, useMemo, useEffect } from 'react';
import { Search, Microscope } from 'lucide-react';
import { ResearchItem, categories } from './data/research-data';
import aiGeneratedData from './data/ai-generated-data.json';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ResearchCard from './components/ResearchCard';
import ResearchModal from './components/ResearchModal';
import StarField from './components/StarField';

function App() {
  const [allResearchData, setAllResearchData] = useState<ResearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(null);

  useEffect(() => {
    setAllResearchData(aiGeneratedData as ResearchItem[]);
    setIsLoading(false);
  }, []);
