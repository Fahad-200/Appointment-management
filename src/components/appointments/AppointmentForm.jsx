import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import { getTodayDate, isPastDate } from "../../utils/dateUtils";

const initialForm = {
    name: "",
    date: "",
    time: "",
    provider: "",
    type: "Consultation",
    status: "Scheduled"
};

// Shared by both the "Add" and "Edit" screens to avoid duplicated form code.
export default function AppointmentForm({
    appointment,
    onSave,
    onCancel
}) {
    const [form, setForm] = useState({ ...initialForm });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (appointment) {
            setForm({
                name: appointment.name || "",
                date: appointment.date || "",
                time: appointment.time || "",
                provider: appointment.provider || "",
                type: appointment.type || "Consultation",
                status: appointment.status || "Scheduled"
            });
        } else {
            setForm({ ...initialForm });
        }

        setErrors({});
    }, [appointment]);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    }

    function validate() {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Patient name is required";
        }

        if (!form.date) {
            newErrors.date = "Appointment date is required";
        } else if (isPastDate(form.date)) {
            newErrors.date = "Past dates are not allowed";
        }

        if (!form.time) {
            newErrors.time = "Appointment time is required";
        }

        if (!form.provider.trim()) {
            newErrors.provider = "Provider is required";
        }

        if (!form.type) {
            newErrors.type = "Appointment type is required";
        }

        if (!form.status) {
            newErrors.status = "Appointment status is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        await onSave({
            name: form.name.trim(),
            date: form.date,
            time: form.time,
            provider: form.provider.trim(),
            type: form.type,
            status: form.status
        });
    }

    return (
        <section className="form-card">
            <div className="form-heading">
                <h2>
                    {appointment ? "Edit Appointment" : "Add Appointment"}
                </h2>

                <p>Enter the patient appointment information below.</p>
            </div>

            <form onSubmit={handleSubmit} className="appointment-form">
                <FormField label="Patient Name" error={errors.name}>
                    <input
                        name="name"
                        placeholder="Enter patient name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Appointment Date" error={errors.date}>
                    <input
                        type="date"
                        name="date"
                        min={getTodayDate()}
                        value={form.date}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Appointment Time" error={errors.time}>
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Provider" error={errors.provider}>
                    <input
                        name="provider"
                        placeholder="Enter doctor name"
                        value={form.provider}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField label="Appointment Type" error={errors.type}>
                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                    >
                        <option value="Consultation">Consultation</option>
                        <option value="Follow-up">Follow-up</option>
                    </select>
                </FormField>

                <FormField label="Status" error={errors.status}>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </FormField>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {appointment
                            ? "Update Appointment"
                            : "Save Appointment"}
                    </button>

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
}