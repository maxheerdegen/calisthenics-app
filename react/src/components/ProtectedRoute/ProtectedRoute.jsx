import { Navigate, useOutletContext, Outlet } from "react-router-dom";

function ProtectedRoute () {
    const { user } = useOutletContext();

    if (!user) {
        return <Navigate to= "/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;