
const API_URL = "http://localhost:5000/appointments";

export const appointmentApi = {
    // Get all appointments
    async getAll() {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch appointments");
        }

        return response.json();
    },

    // Add appointment
    async create(appointment) {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointment)
        });

        if (!response.ok) {
            throw new Error("Unable to add appointment");
        }

        return response.json();
    },

    // Update appointment
    async update(id, appointment) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(appointment)
        });

        if (!response.ok) {
            throw new Error("Unable to update appointment");
        }

        return response.json();
    },

    // Delete appointment
    async delete(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete appointment");
        }

        return true;
    }
};