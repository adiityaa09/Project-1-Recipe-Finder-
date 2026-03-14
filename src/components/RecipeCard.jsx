import React from 'react';

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, isExpanded, onToggleExpand }) => {
  // Extract ingredients (MealDB returns up to 20 ingredients)
  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ing = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ing && ing.trim()) {
            ingredients.push(`${measure ? measure.trim() : ''} ${ing.trim()}`);
        }
    }
    return ingredients;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-50 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group relative">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={() => onToggleFavorite(recipe.idMeal)}
          className="absolute top-3 right-3 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all text-xl"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        {recipe.strCategory && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white tracking-wider">
            {recipe.strCategory}
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {recipe.strMeal}
        </h3>
        <p className="text-sm text-gray-500 mb-4 font-medium flex-1">
          {recipe.strArea} Cuisine
        </p>

        <button 
          onClick={() => onToggleExpand(recipe.idMeal)}
          className="w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold rounded-xl transition-colors focus:ring-4 focus:ring-orange-50 outline-none flex items-center justify-between"
        >
          <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
          <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <h4 className="font-bold text-gray-800 mb-2">Ingredients</h4>
            <ul className="text-sm text-gray-600 mb-4 space-y-1 list-disc pl-5 marker:text-orange-400">
              {getIngredients().map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
            
            <h4 className="font-bold text-gray-800 mb-2">Instructions</h4>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {recipe.strInstructions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
