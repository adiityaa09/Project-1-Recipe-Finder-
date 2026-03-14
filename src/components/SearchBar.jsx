import React, { useState } from 'react';

const SearchBar = ({ onSearch, isVegetarianFilter, setIsVegetarianFilter }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative flex items-center w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white border-2 border-orange-100 text-gray-900 text-sm rounded-full focus:ring-orange-500 focus:border-orange-500 block w-full pl-12 pr-6 py-4 outline-none shadow-sm transition-all focus:shadow-md"
            placeholder="Search for recipes by ingredient (e.g., chicken, beef...)" 
            required 
          />
          <button 
            type="submit" 
            className="absolute right-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-white text-sm px-6 py-2 transition-colors shadow-md"
          >
            Search
          </button>
        </div>
        
        <div className="flex items-center self-start pl-2">
          <label className="relative flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={isVegetarianFilter}
              onChange={(e) => setIsVegetarianFilter(e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">Filter Vegetarian Recipes</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
