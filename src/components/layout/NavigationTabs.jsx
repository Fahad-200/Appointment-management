import React from "react";

export default function NavigationTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "list", label: "1. Appointment Listing" },
        { id: "add", label: "2. Add Appointment" },
        { id: "details", label: "3. Appointment Details" }
    ];

    return (
        <div className="navigation-tabs">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={activeTab === tab.id ? "tab active" : "tab"}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}