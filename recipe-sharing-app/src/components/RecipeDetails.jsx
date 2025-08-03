import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id);
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p><strong>ID:</strong> {recipe.id}</p> {/* ✅ Ensure this is in JSX */}
      <p>{recipe.description}</p>
      <FavoriteButton recipeId={recipeId} />
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton id={recipeId} onDeleted={() => navigate('/')} />
    </div>
  );
};

export default RecipeDetails;
