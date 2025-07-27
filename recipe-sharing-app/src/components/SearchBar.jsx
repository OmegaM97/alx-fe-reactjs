import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  return (
    <input
      type="text"
      placeholder="Search recipes by name..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '10px',
        marginBottom: '20px',
        width: '100%',
        fontSize: '1rem',
      }}
    />
  );
};

export default SearchBar;
