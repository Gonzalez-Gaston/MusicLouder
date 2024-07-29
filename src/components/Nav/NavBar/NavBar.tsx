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
                { text: "About", url: "/about" },
                { text: "Contact", url: "/contact" },
            ]} />
        </header>
    )
}