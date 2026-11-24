const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Resolves relative to this file, not the terminal's working directory
const FILE = path.join(__dirname, "appointments.json");

// GET - Read appointments
app.get("/appointments", async (req, res) => {
    const data = await fs.readFile(FILE, "utf8");
    res.json(JSON.parse(data));
});

// POST - Add appointment
app.post("/appointments", async (req, res) => {
    const data = JSON.parse(await fs.readFile(FILE, "utf8"));

    const newAppointment = {
        id: Date.now(),
        ...req.body
    };

    data.push(newAppointment);

    await fs.writeFile(FILE, JSON.stringify(data, null, 2));

    res.status(201).json(newAppointment);
});

// PUT - Update appointment
app.put("/appointments/:id", async (req, res) => {
    const data = JSON.parse(await fs.readFile(FILE, "utf8"));

    const index = data.findIndex(
        a => a.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }

    data[index] = {
        ...data[index],
        ...req.body,
        id: data[index].id
    };

    await fs.writeFile(FILE, JSON.stringify(data, null, 2));

    res.json(data[index]);
});

// DELETE - Delete appointment
app.delete("/appointments/:id", async (req, res) => {
    const data = JSON.parse(await fs.readFile(FILE, "utf8"));

    const updated = data.filter(
        a => a.id !== Number(req.params.id)
    );

    if (updated.length === data.length) {
        return res.status(404).json({ message: "Not found" });
    }

    await fs.writeFile(FILE, JSON.stringify(updated, null, 2));

    res.json({ message: "Appointment deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});