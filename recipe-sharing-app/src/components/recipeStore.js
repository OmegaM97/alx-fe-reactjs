import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // CRUD
  setRecipes: (newRecipes) =>
    set({
      recipes: newRecipes,
      filteredRecipes: filter(newRecipes, get().searchTerm),
    }),

  addRecipe: (newRecipe) => {
    const updatedRecipes = [...get().recipes, newRecipe];
    return set({
      recipes: updatedRecipes,
      filteredRecipes: filter(updatedRecipes, get().searchTerm),
    });
  },

  deleteRecipe: (id) => {
    const updatedRecipes = get().recipes.filter((r) => r.id !== id);
    return set({
      recipes: updatedRecipes,
      filteredRecipes: filter(updatedRecipes, get().searchTerm),
      favorites: get().favorites.filter((fid) => fid !== id),
    });
  },

  updateRecipe: (updatedRecipe) => {
    const updatedRecipes = get().recipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    );
    return set({
      recipes: updatedRecipes,
      filteredRecipes: filter(updatedRecipes, get().searchTerm),
    });
  },

  // Search
  setSearchTerm: (term) =>
    set({
      searchTerm: term,
      filteredRecipes: filter(get().recipes, term),
    }),

  // Favorites
  addFavorite: (id) => {
    if (!get().favorites.includes(id)) {
      set({ favorites: [...get().favorites, id] });
    }
  },

  removeFavorite: (id) =>
    set({ favorites: get().favorites.filter((fid) => fid !== id) }),

  // Recommendations
  generateRecommendations: () => {
    const favIds = get().favorites;
    const allRecipes = get().recipes;

    const recommended = allRecipes.filter(
      (r) =>
        !favIds.includes(r.id) &&
        favIds.some((fid) =>
          r.title
            .toLowerCase()
            .includes(
              get().recipes
                .find((r) => r.id === fid)
                ?.title?.split(' ')[0]?.toLowerCase()
            )
        )
    );

    set({ recommendations: recommended });
  },
}));

// Utility: Basic search filter
const filter = (recipes, term) =>
  recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(term.toLowerCase())
  );
