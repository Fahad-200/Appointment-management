import React, { useMemo, useRef, useState, useEffect } from "react";
import "./App.css";

import AppHeader from "./components/layout/AppHeader";
import PageHeader from "./components/layout/PageHeader";
import NavigationTabs from "./components/layout/NavigationTabs";

import StatsSection from "./components/dashboard/StatsSection";
import AppointmentList from "./components/dashboard/AppointmentList";

import AppointmentForm from "./components/appointments/AppointmentForm";
import AppointmentDetails from "./components/appointments/AppointmentDetails";

import Loading from "./components/common/Loading";
import Toast from "./components/common/Toast";
import ConfirmDialog from "./components/common/ConfirmDialog";

import useAppointments from "./hooks/useAppointments";

export default function App() {
    const {
        appointments,
        loading,
        error,
        addAppointment,
        updateAppointment,
        deleteAppointment
    } = useAppointments();

    const [activeTab, setActiveTab] = useState("list");

    const [selected, setSelected] = useState(null);
    const [editing, setEditing] = useState(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("asc");

    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    const [deleteTarget, setDeleteTarget] = useState(null);

    // Keep a reference to the auto-dismiss timer so a new toast can cancel the
    // previous timeout (otherwise an older timer could clear a newer toast),
    // and so we can clear it when the component unmounts.
    const toastTimer = useRef(null);

    useEffect(() => {
        return () => {
            if (toastTimer.current) {
                window.clearTimeout(toastTimer.current);
            }
        };
    }, []);

    function showToast(message, type = "success") {
        setToast({ message, type });

        if (toastTimer.current) {
            window.clearTimeout(toastTimer.current);
        }

        toastTimer.current = window.setTimeout(() => {
            setToast({ message: "", type: "success" });
            toastTimer.current = null;
        }, 3000);
    }

    function openAddForm() {
        setEditing(null);
        setActiveTab("add");
    }

    function openEditForm(appointment) {
        setEditing(appointment);
        setSelected(null);
        setActiveTab("add");
    }

    function openDetails(appointment) {
        setSelected(appointment);
        setActiveTab("details");
    }

    function returnToList() {
        setSelected(null);
        setEditing(null);
        setActiveTab("list");
    }

    function handleTabChange(tab) {
        if (tab === "add") {
            openAddForm();
        } else if (tab === "list") {
            returnToList();
        } else if (tab === "details") {
            setActiveTab("details");
        }
    }

    async function handleSave(formData) {
        try {
            if (editing) {
                await updateAppointment(editing.id, formData);
                showToast("Appointment updated successfully!");
            } else {
                await addAppointment(formData);
                showToast("Appointment added successfully!");
            }

            returnToList();
        } catch (err) {
            showToast(err.message || "Something went wrong", "error");
        }
    }

    async function handleDelete() {
        if (!deleteTarget) return;

        try {
            await deleteAppointment(deleteTarget.id);

            if (selected && String(selected.id) === String(deleteTarget.id)) {
                setSelected(null);
            }

            setDeleteTarget(null);
            showToast("Appointment deleted successfully!");
        } catch (err) {
            setDeleteTarget(null);
            showToast(err.message || "Unable to delete", "error");
        }
    }

    const filteredAppointments = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return [...appointments]
            .filter(appointment => {
                const name = (appointment.name || "").toLowerCase();
                const provider = (appointment.provider || "").toLowerCase();

                return (
                    name.includes(searchValue) ||
                    provider.includes(searchValue)
                );
            })
            .filter(
                appointment => filter === "All" || appointment.status === filter
            )
            .sort((a, b) => {
                const result = a.date.localeCompare(b.date);

                return sort === "asc" ? result : -result;
            });
    }, [appointments, search, filter, sort]);

    return (
        <>
            <AppHeader />

            <main className="main-container">
                <PageHeader onAdd={openAddForm} />

                <NavigationTabs
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}
                />

                <Toast message={toast.message} type={toast.type} />

                {loading && <Loading />}

                {error && <div className="error-message">{error}</div>}

                {!loading && !error && (
                    <>
                        {activeTab === "list" && (
                            <>
                                <StatsSection appointments={appointments} />

                                <AppointmentList
                                    appointments={filteredAppointments}
                                    search={search}
                                    setSearch={setSearch}
                                    filter={filter}
                                    setFilter={setFilter}
                                    sort={sort}
                                    setSort={setSort}
                                    onView={openDetails}
                                    onEdit={openEditForm}
                                    onDelete={setDeleteTarget}
                                />
                            </>
                        )}

                        {activeTab === "add" && (
                            <AppointmentForm
                                appointment={editing}
                                onSave={handleSave}
                                onCancel={returnToList}
                            />
                        )}

                        {activeTab === "details" && selected && (
                            <AppointmentDetails
                                appointment={
                                    appointments.find(
                                        a =>
                                            String(a.id) ===
                                            String(selected.id)
                                    ) || selected
                                }
                                onBack={returnToList}
                                onEdit={openEditForm}
                            />
                        )}

                        {activeTab === "details" && !selected && (
                            <div className="empty-state">
                                <h3>No appointment selected</h3>
                                <p>
                                    Choose an appointment from the listing to
                                    view its details.
                                </p>
                                <button
                                    className="btn-primary"
                                    onClick={returnToList}
                                >
                                    Back to Listing
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title="Delete Appointment?"
                message={`Are you sure you want to delete the appointment for ${deleteTarget?.name}? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </>
    );
}