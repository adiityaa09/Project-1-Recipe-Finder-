import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ 
  recipes, 
  favorites, 
  onToggleFavorite, 
  expandedRecipeId, 
  onToggleExpand,
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 px-4 text-red-500 bg-red-50 rounded-2xl max-w-2xl mx-auto border border-red-100">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-gray-500 text-lg">No recipes found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 max-w-7xl mx-auto pb-20">
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.idMeal}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.idMeal)}
          onToggleFavorite={onToggleFavorite}
          isExpanded={expandedRecipeId === recipe.idMeal}
          onToggleExpand={onToggleExpand}
        />
      ))}
    </div>
  );
};

export default RecipeList;
