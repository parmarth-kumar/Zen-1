// At the top, I import React hooks to handle state and effects in my app.
// I also bring in some icons to make the interface modern.
// I load research data and categories to display and sort the research items.
// There’s a JSON file with AI-generated data that I include for more content.
// I add components for the search bar, category filter, research cards, and detail modals.
// Finally, I import a starry background component to make the app look cool and interesting.
import { useState, useMemo, useEffect } from 'react';
import { Search, Microscope } from 'lucide-react';
import { ResearchItem, categories } from './data/research-data';
import aiGeneratedData from './data/ai-generated-data.json';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ResearchCard from './components/ResearchCard';
import ResearchModal from './components/ResearchModal';
import StarField from './components/StarField';

// This is my main App function where I keep track of important data and app state.
// I create a state to store all research data that I will show.
// I also make a loading state to know when data is still loading.
// There’s a state for the search term that the user types in.
// I keep track of the chosen category for filtering the research items.
// Another state holds the research item the user clicks on to see details.
// When the app first loads, I set all research data from the AI-generated file and then say loading is done.

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

 // Here, I use useMemo to create a list of research items that match the search term and selected category.
// I convert the search term to lowercase to check matches without case sensitivity.
// I check if the research title, summary, or any keywords include the search term.
// I also check if the item matches the selected category or if "all" categories are selected.
// This filtered list updates only when the search term, category, or all data changes.
  
  const filteredResearch = useMemo(() => {
    return allResearchData.filter(item => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = (item.title && item.title.toLowerCase().includes(lowerSearchTerm)) ||
                          (item.summary && item.summary.toLowerCase().includes(lowerSearchTerm)) ||
                          (item.keywords && item.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearchTerm)));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allResearchData]);

  // I use useMemo to calculate how many research items belong to each category.
// I ignore the 'all' category because it represents everything.
// For each category, I count the number of research items that fit into it.
// This count updates only when the total research data changes.

 
  const categoryStats = useMemo(() => {
    return categories
      .filter(category => category.id !== 'all')
      .map(category => ({
        ...category,
        count: allResearchData.filter(item => item.category === category.id).length
      }));
  }, [allResearchData]);

 // This return block shows the app's main screen layout.
// The container fills the screen, sets text color, and hides horizontal scroll.
// StarField adds a starry background behind everything.
// The header at the top has a transparent look and a subtle border.
// Inside the header, there’s a box with a gradient and a microscope icon.
// Next to it, the app’s title appears with colorful gradient text.
// Below the title is a small description about exploring NASA’s AI-powered biology research.
// This return block shows the app's main screen layout.
// The container fills the screen, sets text color, and hides horizontal scroll.
// StarField adds a starry background behind everything.
// The header at the top has a transparent look and a subtle border.
// Inside the header, there’s a box with a gradient and a microscope icon.
// Next to it, the app’s title appears with colorful gradient text.
// Below the title is a small description about exploring NASA’s AI-powered biology research.
 
  return (
    <div className="min-h-screen text-slate-100 relative overflow-x-hidden">
    {/* <div className="min-h-screen text-white relative overflow-x-hidden"> */}
      <StarField />
      
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center"> */}
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center">
                <Microscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  Space Biology Knowledge Engine
                </h1>
                <p className="text-xs text-gray-400">Explore NASA's Biology Research - Powered by AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      
      {/* This main section holds the main content and is centered on the page. */} 
{/* // It has a large colorful heading inviting users to explore space biology research.
// Below that is a short description about searching and analyzing NASA’s data.
// The SearchBar allows users to enter search terms and shows the number of results.
// Popular search buttons let users quickly choose common topics and update the search term. */}
     <main>
        <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-violet-400 bg-clip-text text-transparent md:leading-snug">
                Explore Space Biology Research
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Search, analyze, and visualize decades of NASA's space biology data. Discover how life adapts to microgravity, cosmic radiation, and beyond.
              </p>
            </div>
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              resultCount={filteredResearch.length}
            />
            <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-gray-400">Popular searches:</span>
              {['Microgravity', 'Radiation', 'Human Physiology', 'Plant Growth', 'Gene Expression', 'Stem Cells'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-gray-300 hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </section>
       
{/* // This section displays a browse area for research categories.
// It uses a container with padding and ensures content stays above the background with z-index.
// At the top, there's a title "Browse by Category" and a CategoryFilter component for selecting categories.
// Below that, category buttons are shown in a responsive grid layout from 1 to 5 columns based on screen size.
// Each button changes style if it matches the selected category to show it's active.
// Buttons display an icon, the number of items in that category, the category name, and a short description.
// Clicking a button updates the selected category to filter research results accordingly.
``````javascript
// This section displays a browse area for research categories.
// It uses a container with padding and ensures content stays above the background with z-index.
// At the top, there's a title "Browse by Category" and a CategoryFilter component for selecting categories.
// Below that, category buttons are shown in a responsive grid layout from 1 to 5 columns based on screen size.
// Each button changes style if it matches the selected category to show it's active.
// Buttons display an icon, the number of items in that category, the category name, and a short description.
// Clicking a button updates the selected category to filter research results accordingly. */}
        <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
              {categoryStats.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl border transition-all duration-300 group ${
                    selectedCategory === category.id
                      ? 'bg-cyan-500/10 border-cyan-400/50 shadow-cyan-500/20'
                      : 'bg-slate-900/50 border-slate-800 hover:border-gray-700/50 hover:bg-gray-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <category.icon className={`w-8 h-8 transition-colors ${
                      selectedCategory === category.id ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'
                    }`} />
                    <span className="px-2 py-1 bg-gray-800/50 rounded-full text-xs font-medium text-gray-300">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="font-semibold text-left mb-2 group-hover:text-white transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 text-left line-clamp-2">
                    {category.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

    {/* // This section shows search results or a default heading if no search term is entered.
// It displays how many research results match the current filters.
// If data is still loading, it shows a loading message to the user.
// If no results are found, it shows a message with a search icon suggesting to adjust filters.
// If there are results, it displays them as ResearchCard components in a responsive grid.
// Clicking on a research card opens detailed information for that item.
``````javascript
// This section shows search results or a default heading if no search term is entered.
// It displays how many research results match the current filters.
// If data is still loading, it shows a loading message to the user.
// If no results are found, it shows a message with a search icon suggesting to adjust filters.
// If there are results, it displays them as ResearchCard components in a responsive grid.
// Clicking on a research card opens detailed information for that item. */}
        <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'AI-Powered Research Insights'}
              </h2>
              <div className="text-sm text-gray-400">
                {filteredResearch.length} {filteredResearch.length === 1 ? 'result' : 'results'}
              </div>
            </div>
            {isLoading ? (
              <div className="text-center py-16 text-gray-400">Loading AI-Enriched Data...</div>
            ) : filteredResearch.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-400 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms or category filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResearch.map((item) => (
                  <ResearchCard
                    key={item.id}
                    research={item}
                    onClick={setSelectedResearch}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* // This footer appears at the bottom of the page with a top border and padding.
// It centers content and uses a smaller, gray text style to keep it subtle.
// It shows the current year dynamically with the app name and mention of the NASA challenge.
// It credits NASA GeneLab as the data source with a clickable link that opens in a new tab.
// The footer text and link have styling to fit the overall app theme and provide clear information.
``````javascript
// This footer appears at the bottom of the page with a top border and padding.
// It centers content and uses a smaller, gray text style to keep it subtle.
// It shows the current year dynamically with the app name and mention of the NASA challenge.
// It credits NASA GeneLab as the data source with a clickable link that opens in a new tab.
// The footer text and link have styling to fit the overall app theme and provide clear information. */}

      <footer className="relative z-10 border-t border-gray-800/50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Space Biology Knowledge Engine | Built for the NASA Space Apps Challenge.</p>
          <p className="mt-2">
            Data sourced from <a href="https://github.com/jgalazka/SB_publications" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NASA GeneLab</a> and enriched with AI.
          </p>
        </div>
      </footer>

    {/* // This code shows a ResearchModal only if a research item is selected.
// The modal receives the selected research data to display its details.
// When the modal is closed, it clears the selectedResearch state to hide the modal.
``````javascript
// This code shows a ResearchModal only if a research item is selected.
// The modal receives the selected research data to display its details.
// When the modal is closed, it clears the selectedResearch state to hide the modal. */}

      {selectedResearch && (
        <ResearchModal
          research={selectedResearch}
          onClose={() => setSelectedResearch(null)}
        />
      )}
    </div>
  );
}

export default App;
