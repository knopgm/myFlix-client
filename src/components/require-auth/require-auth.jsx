import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ user, children }) {
  /**
   * Reference: https://reactrouter.com/docs/en/v6/examples/auth
   * 1. Verify if user is logged in
   * 2. If user is not authenticated it navigates to /login if
   *    * The current route is not a public route
   * 3. If user is authenticated then render children
   */
  const accessToken = localStorage.getItem("token");
  const location = useLocation();

  if (!accessToken && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(RequireAuth);
