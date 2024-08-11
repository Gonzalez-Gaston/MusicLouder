import { useEffect } from "react";
import { useAuth } from "../../../context/auth_context";
import { useFetch } from "../../../hooks/useFetch";
import "./NavBar.css"
import { NavMenu } from "./NavMenu/NavMenu"
import { useNavigate } from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();
    const { token, isAuthenticated}: any = useAuth("state");
    const { logout }: any = useAuth("actions")

    // Realizar la solicitud HTTP cuando el componente se monta
    useEffect(() => {
        if (isAuthenticated) {
            doFetch();
        }
    }, [isAuthenticated]);

    const handleLoginClick = () => {
        navigate("/login");
    };

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/users/profiles/profile_data/",
        {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    const handleLogout = () => {
        logout();
        navigate("/");
    };


    return (
        <header className="nav-bar">
            <div>
                <img src="../public/logo.jpeg" alt="" />
            </div>
            <NavMenu navItems={[
                { text: "Home", url: "/" },
                { text: "PlayList", url: "/playlist" },
            ]} />
            <div className="container-input">
                <input type="text" className="input-search" placeholder="Busqueda" />
            </div>
            {
                isError ?
                    <p>Se ha producido un error</p>
                    : !isLoading && isAuthenticated ?
                        <div className="container-user">
                            <button onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                            <h4>{data.last_name}</h4>
                            <img src="../public/user.png" alt="" className="user-icon" />
                            {/* <img src="../public/flecha.png" alt="" className="flecha-icon" /> */}
                        </div>
                        : isLoading && !isAuthenticated ? <button className="container-user" onClick={handleLoginClick}>Login</button> : null
            }
        </header>
    );
}