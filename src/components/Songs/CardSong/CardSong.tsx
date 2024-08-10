import { Song } from '../Songs';
import './CardSong.css';

interface CardSongProps extends Song {
    onClick: () => void; // Agrega el tipo para el manejador de clic
}

export function CardSong({ cover, title, artist, album, onClick }: CardSongProps) {
    return (
        <div className="card-song" onClick={onClick}> {/* Agregar el manejador de clic */}
            <img src={cover == null ? "../public/logo.jpeg" : cover} alt={`Album cover for ${title}`} className="card-song-image" />
            <div className="card-song-info">
                <h2 className="card-song-title">{title}</h2>
                <p className="card-song-artist">{artist}</p>
                <p className="card-song-album">{album}</p>
            </div>
        </div>
    );
}
