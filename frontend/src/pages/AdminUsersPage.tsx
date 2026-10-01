import { useEffect, useState } from "react";

import {
  assignRole,
  getUsers,
  type RoleName,
} from "../api/users.api";

import { useAuth } from "../context/AuthContext";
import type { User } from "../types";

function AdminUsersPage() {
  const { hasPermission } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadUsers() {
      if (!hasPermission("user:read")) {
        return;
      }

      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar los usuarios"
        );
      }
    }

    void loadUsers();
  }, [hasPermission]);

  async function handleRoleChange(
    userId: number,
    role: RoleName
  ) {
    try {
      await assignRole(userId, role);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId
            ? { ...user, role }
            : user
        )
      );

      setMessage("Rol actualizado correctamente");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el rol"
      );
    }
  }

  if (!hasPermission("user:read")) {
    return <p>No tenés permiso para administrar usuarios.</p>;
  }

  return (
    <main>
      <h1>Administración de usuarios</h1>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      {users.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.email}</p>

              <p>Rol actual: {user.role}</p>

              {hasPermission("user:assign-role") && (
                <select
                  value={user.role}
                  onChange={(event) =>
                    handleRoleChange(
                      user.id,
                      event.target.value as RoleName
                    )
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="operador">Operador</option>
                  <option value="usuario">Usuario</option>
                </select>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default AdminUsersPage;