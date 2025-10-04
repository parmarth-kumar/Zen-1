import React from 'react';
import { Search,Sparkles} from 'lucide-react';

interface SearchBarProps{
  searchTerm:string;
  onSearchChange:(value:string)=> void;
  resultCount: number;
}
