import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!title.trim()) formErrors.title = "Title is required.";
    if (!ingredients.trim()) {
      formErrors.ingredients = "Ingredients are required.";
    } else {
      const items = ingredients
        .split("\n")
        .filter((item) => item.trim() !== "");
      if (items.length < 2) {
        formErrors.ingredients = "Please list at least 2 ingredients.";
      }
    }
    if (!instructions.trim()) {
      formErrors.instructions = "Preparation steps are required.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newRecipe = {
        title,
        ingredients: ingredients.split("\n").map((item) => item.trim()),
        instructions: instructions.split("\n").map((step) => step.trim()),
      };
      console.log("Submitted Recipe:", newRecipe);
      alert("Recipe submitted! (Currently just logs to console)");
      // reset form
      setTitle("");
      setIngredients("");
      setInstructions("");
      setErrors({});
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Spaghetti Carbonara"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ingredients (one per line)
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
            rows="5"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g.,\n200g spaghetti\n100g bacon"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Steps (one per line)
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
            rows="5"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g.,\nCook spaghetti\nFry bacon"
          ></textarea>
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-md"
          >
            Submit Recipe
          </button>
          <Link
            to="/"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-5 py-2 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
