import { NavBar } from "./NavBar/NavBar";
import "./Layout.css";
import { SideNav } from "./SideNav/SideNav";
import { FooterBar } from "./FooterBar/FooterBar";

export function Layout(){
    return(
        <div className="layout">
            <NavBar />
            <SideNav />
            <FooterBar />
        </div>
    )
}