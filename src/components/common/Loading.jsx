import React from "react";

export default function Loading() {
    return (
        <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading appointments...</p>
        </div>
    );
}