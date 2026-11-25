import React from "react";
import StatCard from "./StatCard";

export default function StatsSection({ appointments }) {
    const total = appointments.length;

    const scheduled = appointments.filter(
        a => a.status === "Scheduled"
    ).length;

    const completed = appointments.filter(
        a => a.status === "Completed"
    ).length;

    return (
        <div className="stats-grid">
            <StatCard count={total} label="Total appointments" />
            <StatCard count={scheduled} label="Scheduled" />
            <StatCard count={completed} label="Completed" />
        </div>
    );
}