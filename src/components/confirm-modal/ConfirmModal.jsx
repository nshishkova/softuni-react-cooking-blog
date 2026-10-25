export default function ConfirmModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="modal-backdrop" onClick={isLoading ? undefined : onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-icon" aria-hidden="true">🗑️</span>
        <h2 id="modal-title">{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button type="button" className="button button-outline" onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </button>
          <button type="button" className="button modal-confirm" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
