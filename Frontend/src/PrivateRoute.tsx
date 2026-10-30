import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@user"
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Route.PrivateRoute");

const PrivateRoute = () => {
    const { loading, isAuthenticated } = useAuth();

    logger.debug("PrivateRoute: ", loading, isAuthenticated)
    
    if (!loading && !isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    return <Outlet />
}

export default PrivateRoute;