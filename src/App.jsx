import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('recipe_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isVegetarianFilter, setIsVegetarianFilter] = useState(false);

  // Initial load: Let's fetch some random recipes or just default to empty
  useEffect(() => {
    // Optionally fetch default recipes here, e.g. "chicken" so it's not empty
    handleSearch('chicken');
  }, []);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('recipe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError('');
    setRecipes([]);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (mealId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(mealId)) {
        return prevFavorites.filter(id => id !== mealId);
      }
      return [...prevFavorites, mealId];
    });
  };

  const toggleExpand = (mealId) => {
    setExpandedRecipeId(prev => (prev === mealId ? null : mealId));
  };

  // Filter recipes based on toggles
  const getFilteredRecipes = () => {
    let filtered = recipes;
    
    // Applying vegetarian filter (client-side since search API does not support combined filter)
    if (isVegetarianFilter) {
      filtered = filtered.filter(
        recipe => 
          recipe.strCategory === 'Vegetarian' || 
          recipe.strCategory === 'Vegan' ||
          recipe.strTags?.includes('Vegetarian') ||
          recipe.strTags?.includes('Vegan')
      );
    }

    // Applying favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(recipe => favorites.includes(recipe.idMeal));
    }
    
    return filtered;
  };

  const filteredRecipes = getFilteredRecipes();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header 
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />
      
      <main className="flex-1 w-full">
        <SearchBar 
          onSearch={handleSearch}
          isVegetarianFilter={isVegetarianFilter}
          setIsVegetarianFilter={setIsVegetarianFilter}
        />
        
        {/* State Information messages */}
        {showFavoritesOnly && (
          <div className="text-center max-w-2xl mx-auto mb-4 px-4 text-orange-600 font-medium">
            Showing only your favorite recipes {isVegetarianFilter && '(Vegetarian)'}
          </div>
        )}
        
        <RecipeList 
          recipes={filteredRecipes}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          expandedRecipeId={expandedRecipeId}
          onToggleExpand={toggleExpand}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
