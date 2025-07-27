import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRecipe({ id: recipe.id, title, description });
    setIsEditing(false);
  };

  return (
    <div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel Edit' : 'Edit Recipe'}
      </button>
      {isEditing && (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditRecipeForm;
