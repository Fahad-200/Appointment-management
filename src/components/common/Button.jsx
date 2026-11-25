import React from "react";

export default function Button({
    children,
    variant = "primary",
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`btn-${variant} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}