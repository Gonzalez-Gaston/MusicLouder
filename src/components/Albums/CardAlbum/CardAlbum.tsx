import { Album } from "../Albums";
import "./CardAlbum.css";

interface CardAlbumProps extends Album {
    onClick: () => void;
}

export function CardAlbum({cover, title, year, onClick}: CardAlbumProps){
    return (
        <div className="card-album"  onClick={onClick}>
            <img src={cover == null ? "../public/logo.jpeg" : cover} alt="" className="card-album-image" />
            <div className="card-album-info">
                <h2 className="card-album-title">{title}</h2>
                <p className="card-album-year">{year}</p>
            </div>
        </div>
    );
}