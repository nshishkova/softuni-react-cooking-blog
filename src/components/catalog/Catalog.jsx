import { useEffect, useState } from "react";
import RecipeCard from "../recipe-card/RecipeCard";
import { Link } from "react-router";
import {recipeApi} from "../../api";

export default function Catalog() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
       recipeApi.getAll()
       .then(setRecipes)
       .catch(err => alert(err));
    }, []);

  return (
      <section className="container catalog-intro">
        <span className="eyebrow">Fresh from the community</span>
        <h1>Find something <em>delicious.</em></h1>
        <p className="section-subtitle">
          Explore everyday favorites, quick meals, and something sweet.
        </p>
        <div className="recipe-toolbar catalog-tools">
          <label className="search-box"
            ><span aria-hidden="true">⌕</span
            ><input
              type="search"
              placeholder="Search recipes..."
              aria-label="Search recipes"
          /></label>
          <div className="filter-pills">
            <a className="filter-pill active" href="catalog.html">All recipes</a
            ><a className="filter-pill" href="catalog.html#quick">Quick & easy</a
            ><a className="filter-pill" href="catalog.html#vegetarian">Vegetarian</a
            ><a className="filter-pill" href="catalog.html#desserts">Desserts</a>
          </div>
        </div>
        <div className="recipe-grid">
        {recipes.length > 0
          ? recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)
          : <h3>No recipes found.</h3>
        }
        </div>
        <div className="centered-action">
          <Link className="button button-primary" to="/recipes/create"
            >Share your recipe ↗</Link
          >
        </div>
      </section>
  );
}