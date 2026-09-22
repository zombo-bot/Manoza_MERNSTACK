import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/students">Students</Link>
      <Link to="/teachers">Teachers</Link>
      <Link to="/teachers/add">Add Teacher</Link>
    </nav>
  );
}

export default Navbar;