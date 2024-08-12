import { useAuth } from "../../../context/auth_context";
import "./NavBar.css"
import { NavMenu } from "./NavMenu/NavMenu"
import { useNavigate } from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, user}: any = useAuth("state");
    const { logout }: any = useAuth("actions")

    const handleLoginClick = () => {
        navigate("/login");
    };

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
                isAuthenticated ?
                    <div className="container-user">
                        <button onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                        <h4>{user?.last_name}</h4>
                        <img src="../public/user.png" alt="" className="user-icon" />
                    </div>
                    : <button className="container-user" onClick={handleLoginClick}>Login</button>
            }
        </header>
    );
}