import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { recipeApi } from "../../api";
import { storageRequest } from "../../utils/request";
import { useAuth } from "../../hooks/useAuth";
import { categories, validateRecipe } from "../../utils/recipe-form";

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

export default function RecipeCreate() {
  const [values, setValues] = useState(initialValues);
  const [isFileUpload, setIsFileUpload] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Release the preview object URL when it changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const changeHandler = (e) => {
    setValues(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];

    setImageFile(file || null);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateRecipe(values, imageFile, isFileUpload);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrl = isFileUpload
        ? await storageRequest(`${crypto.randomUUID()}-${imageFile.name}`, imageFile)
        : values.imageUrl.trim();

      const result = await recipeApi.create({
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        prepTime: Number(values.prepTime),
        servings: Number(values.servings),
        imageUrl,
        ingredients: values.ingredients.trim(),
        instructions: values.instructions.trim(),
        user_id: user.id,
        author: user.user_metadata?.name || user.email,
      });

      toast.success("Recipe created successfully!");

      navigate(`/recipes/${result[0].id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container form-page" id="main">
      <section className="editor-heading">
        <Link className="back-link" to="/recipes">
          ← Back to recipes
        </Link>
        <span className="eyebrow">Your kitchen, your story</span>
        <h1>
          Share a <em>recipe.</em>
        </h1>
        <p>Write it down, add your tips, and pass something delicious along.</p>
      </section>
      <section className="editor-layout">
        <form className="design-form editor-form" onSubmit={submitHandler} noValidate>
          <div className="form-section-title">
            <span>01</span>
            <div>
              <h2>The essentials</h2>
              <p>Give your recipe a name and a little introduction.</p>
            </div>
          </div>
          <label htmlFor="recipe-title">Recipe title</label>
          <input
            id="recipe-title"
            name="title"
            type="text"
            value={values.title}
            placeholder="e.g. Lemon ricotta pasta"
            onChange={changeHandler}
          />
          {errors.title && <p className="field-error">{errors.title}</p>}

          <label htmlFor="description">Short description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            placeholder="What makes this recipe special?"
            value={values.description}
            onChange={changeHandler}
          ></textarea>
          {errors.description && <p className="field-error">{errors.description}</p>}

          <div className="form-two-col">
            <div>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={values.category} onChange={changeHandler}>
                <option value="">Choose a category</option>
                {categories.map(category => <option key={category}>{category}</option>)}
              </select>
              {errors.category && <p className="field-error">{errors.category}</p>}
            </div>
            <div>
              <label htmlFor="time">Prep + cook time (minutes)</label>
              <input
                id="time"
                name="prepTime"
                type="number"
                min="1"
                max="1440"
                value={values.prepTime}
                placeholder="20"
                onChange={changeHandler}
              />
              {errors.prepTime && <p className="field-error">{errors.prepTime}</p>}
            </div>
          </div>
          <div className="form-two-col">
            <div>
              <label htmlFor="servings">Servings</label>
              <input
                id="servings"
                name="servings"
                type="number"
                min="1"
                max="50"
                value={values.servings}
                placeholder="4"
                onChange={changeHandler}
              />
              {errors.servings && <p className="field-error">{errors.servings}</p>}
            </div>
          </div>
          <div className="form-two-col">
            <label htmlFor="toggleFileUpload">Upload image as file?</label>
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
                {previewUrl && <img src={previewUrl} alt="preview" />}
              </>
            ) : (
              <>
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  key="imageUrl"
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  placeholder="https://example.com/your-dish.jpg"
                  value={values.imageUrl}
                  onChange={changeHandler}
                />
              </>
            )}
          </div>
          {errors.image && <p className="field-error">{errors.image}</p>}

          <label htmlFor="ingredients">
            Ingredients <span className="label-hint">One per line</span>
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="5"
            placeholder="200 g pasta&#10;1 lemon&#10;Fresh basil"
            value={values.ingredients}
            onChange={changeHandler}
          ></textarea>
          {errors.ingredients && <p className="field-error">{errors.ingredients}</p>}

          <label htmlFor="instructions">
            Instructions <span className="label-hint">One step per line</span>
          </label>
          <textarea
            id="instructions"
            name="instructions"
            rows="6"
            placeholder="Prepare your ingredients&#10;Cook the pasta&#10;Mix everything together"
            value={values.instructions}
            onChange={changeHandler}
          ></textarea>
          {errors.instructions && <p className="field-error">{errors.instructions}</p>}

          <div className="form-actions">
            <Link className="button button-outline" to="/recipes">
              Cancel
            </Link>
            <button className="button button-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Publishing…" : "Publish recipe ↗"}
            </button>
          </div>
        </form>
        <aside className="editor-aside">
          <div className="aside-tip">
            <span className="tip-icon">✳</span>
            <h3>A little tip</h3>
            <p>
              Clear ingredient amounts and numbered steps make your recipe
              easier for someone else to recreate.
            </p>
          </div>
          <div className="aside-preview">
            <span className="eyebrow">Your recipe, your way</span>
            <img
              src="https://images.unsplash.com/photo-1671523557969-14e564017d09?auto=format&fit=crop&w=800&q=85"
              alt="Pasta inspiration"
            />
            <h3>Make it feel like you.</h3>
            <p>Add the small details you wish you knew before making it.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
