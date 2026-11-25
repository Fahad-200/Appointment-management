import React from "react";

export default function FormField({ label, children, error }) {
    return (
        <div className="form-field">
            <label>{label}</label>

            {children}

            {error && <span className="field-error">{error}</span>}
        </div>
    );
}