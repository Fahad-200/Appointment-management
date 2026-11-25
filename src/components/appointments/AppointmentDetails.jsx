import React from "react";
import StatusBadge from "./StatusBadge";
import { formatDate, formatTime } from "../../utils/dateUtils";

export default function AppointmentDetails({
    appointment,
    onBack,
    onEdit
}) {
    if (!appointment) return null;

    const details = [
        ["Patient Name", appointment.name],
        ["Appointment ID", `#${appointment.id}`],
        ["Appointment Date", formatDate(appointment.date)],
        ["Appointment Time", formatTime(appointment.time)],
        ["Provider", appointment.provider],
        ["Appointment Type", appointment.type]
    ];

    return (
        <section className="details-card">
            <div className="details-heading">
            <div>
                    <h2>Appointment Details</h2>
                    <p>Complete appointment information</p>
                </div>

                <StatusBadge status={appointment.status} />
            </div>

            <div className="details-grid">
                {details.map(([label, value]) => (
                <div className="detail-item" key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                    </div>
                ))}
            </div>

            <div className="details-actions">
                <button className="btn-secondary" onClick={onBack}>
                    Back to Listing
                </button>

                <button
                    className="btn-primary"
                    onClick={() => onEdit(appointment)}
                >
                    Edit Appointment
                </button>
            </div>
        </section>
    );
}