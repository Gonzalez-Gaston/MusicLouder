import "./SideNav.css";
import { Genres } from "./Genres/Genres";

export function SideNav(){
    return (
        <div className="side-nav">
            <div>
                <h3>Navegar</h3>
            </div>
            <ul>
                <li>Canciones</li>
                <li>Albumes</li>
                <li>Artistas</li>
            </ul>
            <hr />
            <div>
                <h3>Generos</h3>
            </div>
            <Genres />
            
        </div>
    )
}