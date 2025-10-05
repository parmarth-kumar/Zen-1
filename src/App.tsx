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


// This is the blueprint for our component's appearance on the screen.
return (
  // This is the main box that holds our entire app.
  // I've styled it to fill the whole screen's height.
  <div className="min-h-screen text-slate-100 relative overflow-x-hidden"> 
    {/* Here I'm adding our special component for the star background. */}
    
    <StarField />
    {/* This is our main header section, like the top banner. */}
    {/* I've styled it to sit on top of the stars with a blurry, see-through look. */}
    
    <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
      {/* This box keeps our header content from stretching too wide and centers it. */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* I'm using this box to organize the content inside neatly. */}
        
        <div className="flex items-center justify-between">
          
          {/* This box will hold our icon and title text side-by-side. */}
          <div className="flex items-center space-x-3">
            
            {/* A colorful, square box for our microscope icon. */}
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-lg flex items-center justify-center">
              {/* Here I'm placing the microscope icon itself. */}
              <Microscope className="w-6 h-6 text-white" />
            </div>
            
            {/* This is the container for our text next to the icon. */}
            <div>
              {/* This is our main title. */}
              {/* I added these styles to give our title a cool gradient color. */}
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                Space Biology Knowledge Engine
              </h1>
              {/* This is our subtitle, which goes right under the main title. */}
              <p className="text-xs text-gray-400">Explore NASA's Biology Research - Powered by AI</p>
            </div>

          </div>
        </div>
      </div>
    </header>
    
  </div>
);

{/* Alright, this is where the main content of our page begins. */}
<main>
  {/* I'm setting up our big "welcome" area here, right at the top. */}
  <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">

    {/* Just a simple container to keep everything nicely centered and looking clean. */}
    <div className="max-w-4xl mx-auto text-center">

      {/* This little div just groups our title and paragraph together. */}
      <div className="mb-8">
        {/* Here's our big, flashy title. I'm really happy with how this gradient text turned out. */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-violet-400 bg-clip-text text-transparent md:leading-snug">
          Explore Space Biology Research
        </h1>
        {/* And the paragraph right below it, explaining what this whole thing is about. */}
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Search, analyze, and visualize decades of NASA's space biology data. Discover how life adapts to microgravity, cosmic radiation, and beyond.
        </p>
      </div>
      
      {/* Time to pull in our SearchBar component. It needs to know what the user is searching for and how to update it. */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredResearch.length}
      />

      {/* This is where I'll put the popular search buttons. */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
        {/* Just a little label so people know what these buttons are for. */}
        <span className="text-gray-400">Popular searches:</span>

        {/* My plan here is to loop through a list of words and make a button for each one. */}
        {['astronaut', 'stem cells', 'plant growth', 'radiation', 'microgravity'].map((term) => (
          
          // Creating the button itself.
          <button
            // React gets grumpy if you map over a list without a unique 'key', so the word itself works perfectly.
            key={term}
            // The magic happens here: when a user clicks, we just set the search term to the word on the button.
            onClick={() => setSearchTerm(term)}
            // A few styles to make these look less like plain buttons and more like little clickable tags.
            className="px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-gray-300 hover:text-white transition-colors"
          >
            {/* And of course, putting the actual word on the button. */}
            {term}
          </button>
        ))}
      </div>
    </div>
  </section>
</main>

{/* Okay, time to build our category browsing section. */}
<section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    
    {/* This is the header for our section, with the title and the filter dropdown. */}
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
      {/* I'm dropping in the filter component here. It needs to know which category is selected and how to change it. */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </div>

    {/* This is the container for all my category cards. I'm using a grid to make it look neat and adjust to different screen sizes. */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
      
      {/* Here's the fun part. I'm looping over my category data to create a card for each one. */}
      {categoryStats.map((category) => (

        // I'm making the whole card a button so it's easy to click.
        <button
          key={category.id} // Just giving React its required unique key.
          // When a user clicks this card, I'll update our app's state to filter by this category.
          onClick={() => setSelectedCategory(category.id)}
          // This is just a check to see if this is the currently selected category. If it is, I give it a special highlighted style.
          className={`p-6 rounded-xl border transition-all duration-300 group ${
            selectedCategory === category.id
              ? 'bg-cyan-500/10 border-cyan-400/50 shadow-cyan-500/20'
              : 'bg-slate-900/50 border-slate-800 hover:border-gray-700/50 hover:bg-gray-900/70'
          }`}
        >
          {/* A little row at the top of the card for the icon and the item count. */}
          <div className="flex items-center justify-between mb-3">
            {/* I'm pulling the right icon for this category from my data. The icon's color will also change if it's selected! */}
            <category.icon className={`w-8 h-8 transition-colors ${
              selectedCategory === category.id ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'
            }`} />
            {/* This little badge shows how many papers are in this category. */}
            <span className="px-2 py-1 bg-gray-800/50 rounded-full text-xs font-medium text-gray-300">
              {category.count}
            </span>
          </div>

          {/* Displaying the category's name. */}
          <h3 className="font-semibold text-left mb-2 group-hover:text-white transition-colors">
            {category.name}
          </h3>
          {/* And a short description so users know what it's about. */}
          <p className="text-sm text-gray-400 text-left line-clamp-2">
            {category.description}
          </p>
        </button>
      ))}
    </div>
  </div>
</section>

{/* This is the big finale section where I'll show all the research results. */}
<section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">

    {/* Just a little header for this section to hold the title and the result count. */}
    <div className="flex items-center justify-between mb-8">
      {/* I made this title smart. It changes based on whether the user has searched for something. */}
      <h2 className="text-2xl font-bold text-white">
        {searchTerm ? `Search Results for "${searchTerm}"` : 'AI-Powered Research Insights'}
      </h2>
      {/* This shows how many results we found. It also correctly says "result" for one item and "results" for more. */}
      <div className="text-sm text-gray-400">
        {filteredResearch.length} {filteredResearch.length === 1 ? 'result' : 'results'}
      </div>
    </div>

    {/* Now for the main logic. First, I check if our data is still loading. */}
    {isLoading ? (
      // If it is, I'll just show a simple "Loading..." message.
      <div className="text-center py-16 text-gray-400">Loading AI-Enriched Data...</div>
    ) : filteredResearch.length === 0 ? (
      // If we're done loading and the filtered list is empty, then I'll show a "No results found" message.
      <div className="text-center py-16">
        <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400 mb-2">No results found</h3>
        <p className="text-gray-500">Try adjusting your search terms or category filter</p>
      </div>
    ) : (
      // And finally, if we're not loading and we DO have results, I'll display them in a neat grid.
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* I'll loop through our filtered list of research items... */}
        {filteredResearch.map((item) => (
          // ...and for each item, I'll create a ResearchCard.
          <ResearchCard
            key={item.id} // The required React key.
            research={item} // Pass the card all the data it needs to display.
            // I'm also giving it a function so I know when a user clicks on it.
            onClick={setSelectedResearch}
          />
        ))}
      </div>
    )}
  </div>
</section>
</main>

{/* And finally, I'm creating the footer for the very bottom of our page. */}
<footer className="relative z-10 border-t border-gray-800/50 py-8 px-4 sm:px-6 lg-px-8 mt-16">
  {/* Just a simple container to hold and center our footer text. */}
  <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
  
    {/* This is our copyright line. I'm using a little bit of JavaScript here to make sure the year is always current. */}
    <p>© {new Date().getFullYear()} Space Biology Knowledge Engine | Built for the NASA Space Apps Challenge.</p>
    
    {/* A quick note to give credit for the data we're using. */}
    <p className="mt-2">
      Data sourced from {/* I'm making the data source a clickable link. */}
      <a 
        href="https://github.com/jgalazka/SB_publications" 
        target="_blank" // This makes sure the link opens in a new tab.
        rel="noopener noreferrer" // These are just for good security practice.
        className="text-blue-400 hover:underline" // Styling the link to look clickable.
      >
        NASA GeneLab
      </a> 
      and enriched with AI.
    </p>
    
  </div>
</footer>

{/* This is a neat little trick in React for showing something conditionally. */}
      {/* It means: "If `selectedResearch` has some data in it (i.e., it's not null)..." */}
      {selectedResearch && (
        <>
          {/* "...then show our ResearchModal pop-up window." */}
          <ResearchModal
            // I'm passing the data of the specific paper the user clicked on into the modal.
            research={selectedResearch}
            // I'm also giving the modal a way to close itself. When it closes, we just clear out the selected research, which makes the modal hide again.
            onClose={() => setSelectedResearch(null)}
          />
        </>
      )}

    </div> {/* This closes our main app container div from the very top. */}
  ); {/* And here we're closing our entire return statement. */}
}

      {/*Finally, I'm exporting our App component so the rest of the application can use it */}
export default App;
