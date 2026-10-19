import { Navigate } from "react-router";

export default function Logout({ onLogout }) {
    onLogout();
    return (
        <Navigate to="/" />
    )
}