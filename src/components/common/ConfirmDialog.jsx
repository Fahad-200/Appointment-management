import React from "react";

export default function ConfirmDialog({
    open,
    title,
    message,
    onConfirm,
    onCancel
}) {
    if (!open) return null;

    return (
    <div className="modal-overlay">
            <div
                className="confirm-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
            >
                <h3 id="confirm-title">{title}</h3>

                <p>{message}</p>

                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>

                    <button className="btn-danger" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}