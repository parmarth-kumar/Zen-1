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
  // Stores the full list of research papers.
  const [allResearchData, setAllResearchData] = useState<ResearchItem[]>([]);
  // Tracks if the app is loading data (true) or has finished (false).
  const [isLoading, setIsLoading] = useState(true);
  // Stores the text from the user's search input.
  const [searchTerm, setSearchTerm] = useState('');
  // Remembers the active category filter, starts with 'all'.
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Holds the data for the paper a user clicks on to see details.
  const [selectedResearch, setSelectedResearch] = useState<ResearchItem | null>(null);
  // This effect runs only once when the app starts.
  useEffect(() => {
    // Load the research data from the local JSON file.
    setAllResearchData(aiGeneratedData as ResearchItem[]);
    setIsLoading(false);
  }, []);
}

// Creates a filtered list of research papers based on the search and category.
const filteredResearch = useMemo(() => {
  // Go through every paper in the main list.
  return allResearchData.filter(item => {
    // Standardize the search term to lowercase for case-insensitive matching.
    const lowerSearchTerm = searchTerm.toLowerCase();
    // Check 1: Does the search term appear in the title, summary, or keywords?
    const matchesSearch = 
      (item.title && item.title.toLowerCase().includes(lowerSearchTerm)) ||
      (item.summary && item.summary.toLowerCase().includes(lowerSearchTerm)) ||
      (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearchTerm)));
    // Check 2: Does the paper's category match the selected one? (Or is 'all' selected?)
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    // A paper is included only if it passes both checks.
    return matchesSearch && matchesCategory;
  });
}, [searchTerm, selectedCategory, allResearchData]);
// Calculates how many papers are in each category.
const categoryStats = useMemo(() => {
  return categories
    // First, remove the "all" option from the list.
    .filter(category => category.id !== 'all')
    // Then, for each remaining category...
    .map(category => ({
      // Keep its original details (name, icon, etc.)...
      ...category,
      // ...and add a 'count' by counting how many papers in the full dataset match its ID.
      count: allResearchData.filter(item => item.category === category.id).length
    }));
}, [allResearchData]); // Recalculate only if the main data list changes.
