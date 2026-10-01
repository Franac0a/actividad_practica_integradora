import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { registerRequest } from "../api/auth.api";

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await registerRequest({
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al registrarse"
      );
    }
  }

  return (
    <main>
      <h1>Registrarse</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">
          Crear cuenta
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;