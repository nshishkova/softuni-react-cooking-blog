import { useAuth } from '../../../hooks/useAuth'

export default function ItemComment({ id, author, text, user_id, onDelete }) {

  const { user } = useAuth();
  const isAuthor = !!user && user.id === user_id;

  return (
    <div className="comment-card">
      <strong>{author}</strong>
      <p>{text}</p>
      {isAuthor && (
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="comment-delete"
          aria-label="Delete comment"
          title="Delete comment"
        >
          ✕
        </button>
      )}
    </div>
  );
}
