import { useState } from "react";
import request, { uploadFile } from "../../utils/request";
import { useNavigate } from "react-router";

const initialValues = {
  title: "",
  description: "",
  category: "",
  prepTime: "",
  imageUrl: "",
  ingredients: "",
  instructions: "",
};

export default function RecipeCreate() {
  const [values, setValues] = useState(initialValues);
  const [isFileUpload, setIsFileUpload] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setValues(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submitAction = async (formData) => {
    const file = formData.get("image");
    let imageUrl = values.imageUrl;

    if (file) {
      const fileName = file.name;
      imageUrl = await uploadFile(fileName, file);
    }

    try {
      await request("/recipes", "POST", {
        ...values,
        prepTime: Number(values.prepTime),
        imageUrl,
      });

      navigate("/recipes");
    } catch (error) {
      alert(error);
    }
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];

    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
  }


  return (
    <main className="container form-page" id="main">
      <section className="editor-heading">
        <a className="back-link" href="/recipes">
          ← Back to recipes
        </a>
        <span className="eyebrow">Your kitchen, your story</span>
        <h1>
          Share a <em>recipe.</em>
        </h1>
        <p>Write it down, add your tips, and pass something delicious along.</p>
      </section>
      <section className="editor-layout">
        <form className="design-form editor-form" action={submitAction}>
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
            required
            onChange={changeHandler}
          />
          <label htmlFor="description">Short description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            placeholder="What makes this recipe special?"
            value={values.description}
            onChange={changeHandler}
          ></textarea>
          <div className="form-two-col">
            <div>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={values.category} onChange={changeHandler}>
                <option>Choose a category</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
              </select>
            </div>
            <div>
              <label htmlFor="time">Prep + cook time (minutes)</label>
              <input
                id="time"
                name="prepTime"
                type="number"
                min="1"
                value={values.prepTime}
                placeholder="20"
                onChange={changeHandler}
              />
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
                  id="fileUpload"
                  name="image"
                  type="file"
                  onChange={fileChangeHandler}
                />
                <img src={previewUrl} alt="preview" />
              </>
            ) : (
              <>
                <label htmlFor="imageUrl">Image URL</label>
                <input
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
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            rows="6"
            placeholder="1. Prepare your ingredients..."
            value={values.instructions}
            onChange={changeHandler}
          ></textarea>
          <label htmlFor="tips">Tips (optional)</label>
          <textarea
            id="tips"
            rows="3"
            placeholder="Any substitutions or serving tips?"
          ></textarea>
          <div className="form-actions">
            <a className="button button-outline" href="index.html">
              Cancel
            </a>
            <button className="button button-primary" type="submit">
              Publish recipe ↗
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
