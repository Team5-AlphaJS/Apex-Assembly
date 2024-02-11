import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth.service";

export default function Header() {
  const { user, userData, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    setUser({ user: null, userData: null });
    navigate('/');
  };

  return (
    <header>
      <NavLink to="/">Home </NavLink>
      { user && <NavLink to="/categories">Categories </NavLink> }
      { user && <NavLink to="/create-post">Create post </NavLink> }
      { user 
        ? (
          <>
            {`Welcome, ${userData?.username} `}
            <button onClick={logout}>Logout</button>
          </>
        )
        : (<>
          <NavLink to="/login">Login </NavLink>
          <NavLink to="/register">Register </NavLink>
        </>) }
    </header>
  );
}
