import { NavBar } from "./NavBar/NavBar";
import "./Layout.css";
import { SideNav } from "./SideNav/SideNav";
import { FooterBar } from "./FooterBar/FooterBar";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="layout">
            <NavBar />
            <div className="container">
                <SideNav />
                <div className="container-outlet">
                    <Outlet />
                </div>
            </div>
            <FooterBar />
        </div>
    )
}