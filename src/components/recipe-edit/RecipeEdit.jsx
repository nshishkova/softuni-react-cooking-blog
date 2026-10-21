import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import AuthContext from "../../contexts/auth-context";
import request from "../../utils/request";
import { recipeApi } from "../../api";

const initialValues = {
  title: "",
  description: "",
  category: "",
  prepTime: "",
  imageUrl: "",
  ingredients: "",
  instructions: "",
};

export default function RecipeEdit() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(initialValues);
  const { accessToken } = useContext(AuthContext);

  const changeHandler = (e) => {
    setRecipe(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    request(`/recipes?id=eq.${recipeId}`)
      .then(data => setRecipe(data[0]))
  }, [recipeId]);

  const editAction = async () => {
    try {
      await recipeApi.update(recipeId, recipe, accessToken);

      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main className="container form-page" id="main">
      <section className="editor-heading">
        <a className="back-link" href="index.html">← Back to recipes</a
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
          >{recipe.description}</textarea
          >
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
                min="1"
                value={recipe.prepTime}
                onChange={changeHandler}
                placeholder="20"
              />
            </div>
          </div>
          <label htmlFor="image">Image URL</label
          ><input
            id="image"
            name="imageUrl"
            type="url"
            value={recipe.imageUrl}
            onChange={changeHandler}
            placeholder="https://example.com/your-dish.jpg"
          /><label htmlFor="ingredients"
          >Ingredients <span className="label-hint">One per line</span></label
          ><textarea
            id="ingredients"
            rows="5"
            placeholder="200 g pasta&#10;1 lemon&#10;Fresh basil"
            value={recipe.ingredients}
            onChange={changeHandler}
          >
            200 g pasta
            1 lemon, zested
            150 g ricotta
            Fresh basil
            Salt and black pepper</textarea
          ><label htmlFor="instructions">Instructions</label
          ><textarea
            id="instructions"
            rows="6"
            placeholder="1. Prepare your ingredients..."
            value={recipe.instructions}
            onChange={changeHandler}
          >
            1. Cook pasta in salted water until al dente.
            2. Mix ricotta with lemon zest and a splash of pasta water.
            3. Toss pasta through the sauce.
            4. Finish with basil and black pepper.</textarea
          ><label htmlFor="tips">Tips (optional)</label
          ><textarea
            id="tips"
            rows="3"
            placeholder="Any substitutions or serving tips?"
          >
            Save a little pasta water to make the sauce silky.</textarea
          >
          <div className="form-actions">
            <a className="button button-outline" href="index.html">Cancel</a
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
            <span className="eyebrow">Current cover image</span
            ><img
              src="https://images.unsplash.com/photo-1671523557969-14e564017d09?auto=format&fit=crop&w=800&q=85"
              alt="Lemon ricotta pasta"
            />
            <h3>Lemon ricotta pasta</h3>
            <p>Dinner · 20 minutes</p>
          </div>
        </aside>
      </section>
    </main>

  )
}