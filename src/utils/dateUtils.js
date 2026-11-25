// Date/time helpers: local ISO date, past-date check, and display formatting.

export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function isPastDate(date) {
    return date < getTodayDate();
}

export function formatDate(date) {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    });
}

export function formatTime(time) {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    });
}