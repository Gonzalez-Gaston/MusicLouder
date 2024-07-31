import "./NavBar.css"
import { NavMenu } from "./NavMenu/NavMenu"

export function NavBar() {
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
                <input type="text" className="input-search" placeholder="Busqueda"/>
            </div>
            <div className="container-user">
                <img src="../public/user.png" alt="" className="user-icon"/>
                <img src="../public/flecha.png" alt="" className="flecha-icon"/>
            </div>
        </header>
    )
}