import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <p>&copy; 2024 - All rights reserved <NavLink to="/about">About us</NavLink></p>
    </footer>
  );
}