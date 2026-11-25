import React from "react";

export default function AppointmentToolbar({
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort
}) {
    return (
        <div className="toolbar">
            <input
                type="search"
                placeholder="Search patient or provider..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>

            <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value="asc">Sort by date</option>
                <option value="desc">Newest first</option>
            </select>
        </div>
    );
}