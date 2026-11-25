
import React from "react";
import EmptyState from "../common/EmptyState";

export default function AppointmentTable({
    appointments,
    onView,
    onEdit,
    onDelete
}) {
    return (
        <div className="appointment-cards">
            {appointments.length === 0 ? (
                <EmptyState />
            ) : (
                appointments.map((appointment) => (
                    <div
                        className="appointment-card"
                        key={appointment.id}
                    >
                        <div className="appointment-card-header">
                            <div>
                                <h3>
                                    {appointment.name}
                                </h3>

                                <span className="appointment-number">
                                    Appointment #{appointment.id}
                                </span>
                            </div>

                            <span
                                className={`status-badge ${appointment.status?.toLowerCase()}`}
                            >
                                {appointment.status}
                            </span>
                        </div>

                        <div className="appointment-details">
                            <span>
                                <i className="fa-regular fa-calendar"></i>
                                {appointment.date}
                            </span>

                            <span>
                                <i className="fa-regular fa-clock"></i>
                                {appointment.time}
                            </span>

                            <span>
                                {appointment.provider}
                            </span>

                            <span>
                                {appointment.type}
                            </span>
                        </div>

                        <div className="appointment-card-actions">
                            <button
                                className="view-btn"
                                onClick={() => onView(appointment)}
                            >
                                View
                            </button>

                            <button
                                className="edit-btn"
                                onClick={() => onEdit(appointment)}
                            >
                                Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => onDelete(appointment)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
