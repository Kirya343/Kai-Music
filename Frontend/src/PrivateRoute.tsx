import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@user"
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Route.PrivateRoute");

const PrivateRoute = () => {

    const { loading, isAuthenticated } = useAuth();
    const location = useLocation();

    logger.debug("PrivateRoute: ", loading, isAuthenticated);

    if (!loading && !isAuthenticated) {
        const redirectQuery = encodeURIComponent(
            location.pathname + location.search + location.hash
        );

        return <Navigate to={`/login?redirect=${redirectQuery}`} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;