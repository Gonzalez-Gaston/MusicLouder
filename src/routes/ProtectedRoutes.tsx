import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth_context";

export default function ProtectedRoute({ children }: any) {
    const { isAuthenticated }: any = useAuth("state");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}