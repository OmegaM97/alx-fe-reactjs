import { useRecipeStore } from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFav = favorites.includes(recipeId);

  return (
    <button
      onClick={() =>
        isFav ? removeFavorite(recipeId) : addFavorite(recipeId)
      }
      style={{
        marginTop: '5px',
        color: isFav ? 'red' : 'gray',
      }}
    >
      {isFav ? '★ Remove Favorite' : '☆ Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
