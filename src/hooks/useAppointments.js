import { useState, useEffect, useCallback } from "react";
import { appointmentApi } from "../api/appointmentApi";

export default function useAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAppointments = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await appointmentApi.getAll();
            setAppointments(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const addAppointment = async (appointment) => {
        const saved = await appointmentApi.create(appointment);

        setAppointments(prev => [...prev, saved]);

        return saved;
    };

    const updateAppointment = async (id, appointment) => {
        const updated = await appointmentApi.update(id, appointment);

        setAppointments(prev =>
            prev.map(item =>
                String(item.id) === String(id) ? updated : item
            )
        );

        return updated;
    };

    const deleteAppointment = async (id) => {
        await appointmentApi.delete(id);

        setAppointments(prev =>
            prev.filter(item => String(item.id) !== String(id))
        );
    };

    return {
        appointments,
        loading,
        error,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        refreshAppointments: fetchAppointments
    };
}