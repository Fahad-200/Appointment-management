import React from "react";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../../utils/dateUtils";

export default function AppointmentRow({
    appointment,
    onView,
    onEdit,
    onDelete
}) {
    return (
        <tr>
            <td>
            <strong>{appointment.name}</strong>
                <small>Appointment #{appointment.id}</small>
            </td>

            <td>{formatDate(appointment.date)}</td>

            <td>{appointment.time}</td>

            <td>{appointment.provider}</td>

            <td>{appointment.type}</td>

            <td>
                <StatusBadge status={appointment.status} />
            </td>

            <td className="action-buttons">
                <button
                    className="btn-view"
                    onClick={() => onView(appointment)}
                >
                    View
                </button>

                <button
                    className="btn-edit"
                    onClick={() => onEdit(appointment)}
                >
                    Edit
                </button>

                <button
                    className="btn-delete"
                    onClick={() => onDelete(appointment)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}