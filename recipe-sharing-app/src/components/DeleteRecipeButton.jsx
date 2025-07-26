import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ id, onDeleted }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleClick = () => {
    deleteRecipe(id);
    if (onDeleted) onDeleted();
  };

  return (
    <button onClick={handleClick} style={{ color: 'red', marginTop: '10px' }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
