import React from "react";

export default function PageHeader({ onAdd }) {
    return (
        <div className="page-header">
            <button className="btn-primary" onClick={onAdd}>
                + Add Appointment
            </button>
        </div>
    );
}