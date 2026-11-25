
import React from "react";
import AppointmentToolbar from "../appointments/AppointmentToolbar";
import AppointmentTable from "../appointments/AppointmentTable";

export default function AppointmentList({
    appointments,
    search,
    setSearch,
    filter,
    setFilter,
    sort,
    setSort,
    onView,
    onEdit,
    onDelete
}) {
    return (
        <section className="appointment-section">
            <div className="section-heading">
                <h2>Appointment List</h2>
                <span>
                    Showing {appointments.length} appointments
                </span>
            </div>

            <AppointmentToolbar
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
            />

            <AppointmentTable
                appointments={appointments}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </section>
    );
}
