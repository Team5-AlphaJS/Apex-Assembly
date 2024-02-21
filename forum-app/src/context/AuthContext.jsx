import { createContext } from "react";

/**
 * Context for managing authentication state.
 *
 * @typedef {Object} AuthContext
 * @property {Object} user - The authenticated user.
 * @property {Object} userData - Additional user data.
 * @property {Function} setContext - Function to update the context.
 */
export const AuthContext = createContext({
  user: null,
  userData: null,
  setContext: () => { },
});
