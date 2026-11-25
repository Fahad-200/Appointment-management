import React from "react";

export default function EmptyState() {
    return (
        <div className="empty-state">
            <h3>No appointments found</h3>
            <p>There are no appointments matching your search.</p>
        </div>
    );
}