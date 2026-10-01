import { Link } from "react-router";

import NotificationBell from "./NotificationBell";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const {
    user,
    isAuthenticated,
    logout,
    hasPermission,
  } = useAuth();

  return (
    <nav>
      <Link to="/products">
        Productos
      </Link>

      {" | "}

      {!isAuthenticated && (
        <>
          <Link to="/login">
            Login
          </Link>

          {" | "}

          <Link to="/register">
            Registro
          </Link>
        </>
      )}

      {isAuthenticated && (
        <>
          <NotificationBell />

          {" | "}

          {hasPermission("user:read") && (
            <>
              <Link to="/admin/users">
                Usuarios
              </Link>

              {" | "}
            </>
          )}

          <span>
            {user?.email}
          </span>

          {" | "}

          <button onClick={logout}>
            Cerrar sesión
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;