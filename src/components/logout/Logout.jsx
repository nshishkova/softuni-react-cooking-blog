import { Navigate } from "react-router";
import { useEffect, useContext } from "react";
import AuthContext from "../../contexts/auth-context";
    
export default function Logout() {
    const {logout} = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Navigate to="/" />
    )
}