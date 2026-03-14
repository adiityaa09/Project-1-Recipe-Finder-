import React from 'react';

const Header = ({ favoritesCount, showFavoritesOnly, setShowFavoritesOnly }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-10 w-full transition-all">
      <div className="flex items-center gap-2">
        <span className="text-3xl">🍲</span>
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 tracking-tight">
          Recipe Finder
        </h1>
      </div>
      
      <button 
        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all shadow-sm
          ${showFavoritesOnly 
            ? 'bg-orange-500 text-white hover:bg-orange-600' 
            : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
      >
        <span>{showFavoritesOnly ? 'Show All' : 'My Favorites'}</span>
        <span className="bg-white/30 px-2 py-0.5 rounded-full text-sm">
          ❤️ {favoritesCount}
        </span>
      </button>
    </header>
  );
};

export default Header;
