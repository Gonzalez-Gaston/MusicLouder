import React, { useEffect, useState } from "react";
import "./Login.css";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/auth_context";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/api-auth/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );

  console.log(data);


  const { login }: any = useAuth("actions");

  function handleSubmit(event: any) {
    event.preventDefault();
    setTriggerFetch(true);
    doFetch();
  }

  function handleChange(event: any) {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  }

  useEffect(() => {
    if (data && !isError && triggerFetch) {
      login(data.token);
    }
  }, [data, isError, triggerFetch]);


  return (
    <div className="login-container">
      <div className="video-background">
        <iframe
          src="https://www.youtube.com/embed/zqXohGL36cw?autoplay=1&mute=1&controls=0&loop=1&playlist=zqXohGL36cw"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Background Video"
        ></iframe>
      </div>
      <div className="login-form">
        <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit">Login</button>
          {isLoading && triggerFetch && (
            <p>Cargando...</p>
          )}
          {isError && <p>Error al cargar los datos.</p>}
        </form>
      </div>
    </div>
  );
};
