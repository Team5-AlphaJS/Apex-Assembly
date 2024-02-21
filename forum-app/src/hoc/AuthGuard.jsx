import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

/**
 * A higher-order component that guards the access to a route based on the user's authentication status.
 * If the user is not authenticated, it redirects to the login page.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {ReactNode} - The child components if the user is authenticated, otherwise it redirects to the login page.
 */
export default function AuthGuard({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate replace to="/login" state={{ from: location }} />
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};