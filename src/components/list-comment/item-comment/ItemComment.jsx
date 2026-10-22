import { useAuth } from '../../../hooks/useAuth'

export default function ItemComment({ id, author, text, userId, onDelete }) {

  const { user } = useAuth();
  const isAuthor = user?.id === userId;

  return (
    <div className="comment-card">
      <strong>{author}</strong>
      <p>{text}</p>
      {isAuthor && (
        <button onClick={() => onDelete(id)} className="button button-danger">
          Delete
        </button>
      )}
    </div>
  );
}