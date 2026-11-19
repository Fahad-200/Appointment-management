import React, { useState } from 'react';

function App() {

    const [appointments, setAppointments] = useState([
        {
            id: 1,
            name: "Rahul",
            date: "2026-11-20",
            time: "10:00",
            provider: "Dr. Kumar",
            type: "Consultation",
            status: "Scheduled"
        },
        {
            id: 2,
            name: "Priya",
            date: "2026-11-21",
            time: "11:30",
            provider: "Dr. Sharma",
            type: "Follow-up",
            status: "Completed"
        },
        {
            id: 3,
            name: "John",
            date:"2026-11-22",
            time:"12:30",
            provider:"Dr. Manoj",
            type:"Consultation",
            status:"Completed"

        }
    ]);

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [provider, setProvider] = useState("");
    const [type, setType] = useState("Consultation");
    const [status, setStatus] = useState("Scheduled");

    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState(null);

    // Add or Update
    function saveAppointment(e) {
        e.preventDefault();

        if (date < new Date().toLocaleDateString('en-CA')) {
            alert("Past dates are not allowed");
            return;
        }

        if (editId === null) {
            const newAppointment = {
                id: Date.now(),
                name, date, time, provider, type, status
            };

            setAppointments([...appointments, newAppointment]);
            alert("Appointment Added");
        } else {
            const updated = appointments.map((a) =>
                a.id === editId
                    ? { id: editId, name, date, time, provider, type, status }
                    : a
            );

            setAppointments(updated);
            alert("Appointment Updated");
            setEditId(null);
        }

        clearForm();
    }

    // Clear Form
    function clearForm() {
        setName("");
        setDate("");
        setTime("");
        setProvider("");
        setType("Consultation");
        setStatus("Scheduled");
        setEditId(null);
    }

    // Edit
    function editAppointment(a) {
        setName(a.name);
        setDate(a.date);
        setTime(a.time);
        setProvider(a.provider);
        setType(a.type);
        setStatus(a.status);
        setEditId(a.id);
        setSelected(null);
    }

    // Delete
    function deleteAppointment(id) {
        if (window.confirm("Are you sure you want to delete?")) {
            setAppointments(appointments.filter((a) => a.id !== id));
        }
    }

    // Search and Filter
    const filtered = appointments
        .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
        .filter((a) => filter === "All" || a.status === filter)
        .sort((a, b) => a.date.localeCompare(b.date));

    return (
        <div className="container">
             <h1>Appointment Dashboard</h1>

            <h2>{editId === null ? "Add Appointment" : "Edit Appointment"}</h2>

            <form onSubmit={saveAppointment}>

                <input
                    placeholder="Patient Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="date"
                    value={date}
                    min={new Date().toLocaleDateString('en-CA')}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />

                <input
                    placeholder="Provider Name"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    required
                />

                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                </select>

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                </select>

                <button type="submit">
                    {editId === null ? "Add Appointment" : "Update Appointment"}
                </button>

                {editId !== null && (
                    <button type="button" onClick={clearForm}>
                        Cancel
                    </button>
                )}

            </form>

            <hr />

            <h2>Appointment List</h2>

            <input
                placeholder="Search Patient Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option>All</option>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Cancelled</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Provider</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filtered.length === 0 ? (
                        <tr>
                            <td colSpan="7">No appointments available</td>
                        </tr>
                    ) : (
                        filtered.map((a) => (
                            <tr key={a.id}>
                                <td>{a.name}</td>
                                <td>{a.date}</td>
                                <td>{a.time}</td>
                                <td>{a.provider}</td>
                                <td>{a.type}</td>
                                <td>{a.status}</td>
                                <td>
                                    <button onClick={() => setSelected(a)}>
                                        View
                                    </button>

                                    <button onClick={() => editAppointment(a)}>
                                        Edit
                                    </button>

                                    <button onClick={() => deleteAppointment(a.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {selected && (
                <div>
                    <h2>Appointment Details</h2>
                    <p>Name: {selected.name}</p>
                    <p>Date: {selected.date}</p>
                    <p>Time: {selected.time}</p>
                    <p>Provider: {selected.provider}</p>
                    <p>Type: {selected.type}</p>
                    <p>Status: {selected.status}</p>

                    <button onClick={() => setSelected(null)}>
                        Back
                    </button>
                </div>
            )}

        </div>
    );
}

export default App;