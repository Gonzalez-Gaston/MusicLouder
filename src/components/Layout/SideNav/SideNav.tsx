import "./SideNav.css";
import { Genres } from "./Genres/Genres";
import { Link } from "react-router-dom";

export function SideNav() {
    return (
        <div className="side-nav">
            <div>
                <h3>Navegar</h3>
            </div>
            <div className="link-options">
                <Link to={"/songs"} className="item-link">
                        Canciones
                </Link>
                <Link to={"/albums"} className="item-link">
                    Albumes
                </Link>
                <Link to={"/artists"} className="item-link">
                    Artistas
                </Link>
            </div>
            <hr />
            <div>
                <h3>Generos</h3>
            </div>
            <Genres />

        </div>
    )
}