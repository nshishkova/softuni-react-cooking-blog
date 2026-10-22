import { Link } from "react-router";

export default function RecipeCard(
    { id, title, description, category, imageUrl, prepTime }
) {
  return (
    <article className="recipe-card">
      <Link to={`/recipes/${id}`} className="recipe-image-link">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
          />
        )}
        {/* <span className="recipe-tag">Quick & easy</span> */}
      </Link>
      <div className="recipe-card-body">
        <div className="recipe-meta">
          <span>{category}</span>
          <span>·</span>
          <span>{prepTime} MIN</span>
        </div>
        <h3>
          <Link to={`/recipes/${id}`}>{title}</Link>
        </h3>
        <p>{description}</p>
        <div className="recipe-author">
          <span className="author-avatar">E</span>
          <span>by Emma Wilson</span>
          <span className="recipe-rating">★ 4.9</span>
        </div>
      </div>
    </article>
  );
}
