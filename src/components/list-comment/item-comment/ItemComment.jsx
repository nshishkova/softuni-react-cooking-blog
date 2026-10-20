export default function ItemComment({ author, text }) {
  return (
    <div className="comment-card">
      <strong>{author}</strong>
      <p>{text}</p>
    </div>
  );
}