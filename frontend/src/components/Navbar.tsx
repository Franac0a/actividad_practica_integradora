import { Link } from "react-router";

function Navbar() {
  return (
    <nav>
      <Link to="/">Productos</Link>
      {" | "}
      <Link to="/login">Login</Link>
      {" | "}
      <Link to="/register">Registro</Link>
      {" | "}
      <Link to="/notifications">Notificaciones</Link>
      {" | "}
      <Link to="/admin/users">Usuarios</Link>
    </nav>
  );
}

export default Navbar;