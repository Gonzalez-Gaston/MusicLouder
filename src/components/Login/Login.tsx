import React, { useEffect, useState } from "react";
import "./Login.css";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/auth_context";

export const Login: React.FC = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setError("");

  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Autenticación falló");
  //     }

  //     const data = await response.json();

  //     console.log("Logueo Existoso", data);
  //   } catch (error) {
  //     setError(
  //       "Autenticación falló. Por favor revisa las credenciales y vuelve a intentar."
  //     );
  //   }
  // };









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
    //triggerFetch
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
          {data && (
            <p>{`Token obtenido: ${data.token}`}</p>
          )}
        </form>
      </div>
    </div>
  );
  // return (
  //   <div className="login-container">
  //     <div className="video-background">
  //       <iframe
  //         src="https://www.youtube.com/embed/zqXohGL36cw?autoplay=1&mute=1&controls=0&loop=1&playlist=zqXohGL36cw"
  //         frameBorder="0"
  //         allow="autoplay; encrypted-media"
  //         allowFullScreen
  //         title="Background Video"
  //       ></iframe>
  //     </div>
  //     <div className="login-form">
  //       <h2>Inicia sesión</h2>
  //       <form onSubmit={handleSubmit}>
  //         <div>
  //           <label>Usuario:</label>
  //           <input
  //             type="text"
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //             required
  //           />
  //         </div>
  //         <div>
  //           <label>Contraseña:</label>
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //           />
  //         </div>
  //         {error && <p style={{ color: "red" }}>{error}</p>}
  //         <button type="submit">Login</button>
  //       </form>
  //     </div>
  //   </div>
  // );
};
