import { Album } from "../Albums";
import "./CardAlbum.css";

// interface CardAlbumProps extends Album {}

export function CardAlbum(album: Album){
    return (
        <div className="card-album">
            <img src={album.cover == null ? "../public/logo.jpeg" : album.cover} alt="" className="card-album-image" />
            <div className="card-album-info">
                <h2 className="card-album-title">{album.title}</h2>
                <p className="card-album-year">{album.year}</p>
            </div>
        </div>
    );
}