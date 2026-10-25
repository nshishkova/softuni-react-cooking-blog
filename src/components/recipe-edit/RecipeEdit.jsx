import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import request, { storageRequest } from "../../utils/request";
import { recipeApi } from "../../api";
import { useAuth } from "../../hooks/useAuth";

const initialValues = {
  title: "",
  description: "",
  category: "",
  prepTime: "",
  servings: "",
  imageUrl: "",
  ingredients: "",
  instructions: "",
};

export default function RecipeEdit() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(initialValues);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Release the preview object URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];

    setImageFile(file || null);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const changeHandler = (e) => {
    setRecipe(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    request(`/recipes?id=eq.${recipeId}`)
      .then(data => {
        if (!data[0]) {
          alert("Recipe not found.");
          navigate("/recipes");
          return;
        }

        setRecipe(data[0]);
      })
      .catch(error => alert(error.message));
  }, [recipeId, navigate]);

  const editAction = async () => {
    try {
      // Upload the new file if one was chosen, otherwise keep the image URL
      const imageUrl = isFileUpload && imageFile
        ? await storageRequest(`${crypto.randomUUID()}-${imageFile.name}`, imageFile)
        : recipe.imageUrl;

      await recipeApi.update(recipeId, { ...recipe, imageUrl });

      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      alert(error);
    }
  };

  // Only the author of the recipe can edit it
  if (recipe.user_id && recipe.user_id !== user?.id) {
    return (
      <main className="container form-page" id="main">
        <p className="empty-state">You can only edit your own recipes.</p>
      </main>
    );
  }

  return (
    <main className="container form-page" id="main">
      <section className="editor-heading">
        <Link className="back-link" to={`/recipes/${recipeId}`}>← Back to recipe</Link
        ><span className="eyebrow">Make it even better</span>
        <h1>Edit your <em>recipe.</em></h1>
        <p>Update the details, improve the instructions, or add a new tip.</p>
      </section>
      <section className="editor-layout">
        <form className="design-form editor-form" action={editAction}>
          <div className="form-section-title">
            <span>01</span>
            <div>
              <h2>Recipe details</h2>
              <p>Change anything that needs a little update.</p>
            </div>
          </div>
          <label htmlFor="recipe-title">Recipe title</label
          ><input
            id="recipe-title"
            name="title"
            type="text"
            placeholder="e.g. Lemon ricotta pasta"
            value={recipe.title}
            onChange={changeHandler}
            required
          /><label htmlFor="description">Short description</label
          ><textarea
            id="description"
            name="description"
            rows="3"
            placeholder="What makes this recipe special?"
            value={recipe.description}
            onChange={changeHandler}
          ></textarea>
          <div className="form-two-col">
            <div>
              <label htmlFor="category">Category</label
              ><select id="category" name="category" value={recipe.category} onChange={changeHandler}>
                <option>Choose a category</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
              </select>
            </div>
            <div>
              <label htmlFor="time">Prep + cook time (minutes)</label
              ><input
                id="time"
                type="number"
                name="prepTime"
                min="1"
                value={recipe.prepTime}
                onChange={changeHandler}
                placeholder="20"
              />
            </div>
            <div>
              <label htmlFor="servings">Servings</label
              ><input
                id="servings"
                type="number"
                name="servings"
                min="1"
                value={recipe.servings}
                onChange={changeHandler}
                placeholder="4"
              />
            </div>
          </div>
          <div className="form-two-col">
            <label htmlFor="toggleFileUpload">Upload a new image as file?</label>
            <input
              id="toggleFileUpload"
              name="toggleFileUpload"
              type="checkbox"
              checked={isFileUpload}
              onChange={() => setIsFileUpload(!isFileUpload)}
            />

            {isFileUpload ? (
              <>
                <label htmlFor="fileUpload">Upload File</label>
                <input
                  key="fileUpload"
                  id="fileUpload"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={fileChangeHandler}
                />
              </>
            ) : (
              <>
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  key="imageUrl"
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={recipe.imageUrl}
                  onChange={changeHandler}
                  placeholder="https://example.com/your-dish.jpg"
                />
              </>
            )}
          </div>
          <label htmlFor="ingredients"
          >Ingredients <span className="label-hint">One per line</span></label
          ><textarea
            id="ingredients"
            rows="5"
            placeholder="200 g pasta&#10;1 lemon&#10;Fresh basil"
            value={recipe.ingredients}
            onChange={changeHandler}
            name="ingredients"
          ></textarea
          ><label htmlFor="instructions">Instructions <span className="label-hint">One per line</span></label
          ><textarea
            id="instructions"
            rows="6"
            placeholder="Prepare your ingredients..."
            value={recipe.instructions}
            onChange={changeHandler}
            name="instructions"
          ></textarea>
          <div className="form-actions">
            <Link className="button button-outline" to={`/recipes/${recipeId}`}>Cancel</Link
            ><button className="button button-primary" type="submit">
              Save changes ✓
            </button>
          </div>
        </form>
        <aside className="editor-aside">
          <div className="aside-tip">
            <span className="tip-icon">✎</span>
            <h3>Editing a recipe</h3>
            <p>
              Keep the ingredient list in sync with the steps so cooks can
              follow along without guessing.
            </p>
          </div>
          <div className="aside-preview">
            <span className="eyebrow">
              {previewUrl ? "New cover image" : "Current cover image"}
            </span>
            {(previewUrl || recipe.imageUrl) && (
              <img src={previewUrl || recipe.imageUrl} alt={recipe.title} />
            )}
            <h3>{recipe.title}</h3>
            <p>{recipe.category} · {recipe.prepTime} minutes</p>
          </div>
        </aside>
      </section>
    </main>

  )
}