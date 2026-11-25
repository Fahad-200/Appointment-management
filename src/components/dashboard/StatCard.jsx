import React from "react";

export default function StatCard({ count, label }) {
    return (
        <div className="stat-card">
            <h2>{count}</h2>
            <p>{label}</p>
        </div>
    );
}