import { Song } from '../Songs';
import './CardSong.css';

interface CardSongProps extends Song {
    onClick: () => void; // Agrega el tipo para el manejador de clic
}

export function CardSong({ cover, title, artist, album, onClick }: CardSongProps) {
    return (
        <div className="CardSong" onClick={onClick}> {/* Agregar el manejador de clic */}
            <img src={cover == null ? "" : cover} alt={`Album cover for ${title}`} className="CardSong-image" />
            <div className="CardSong-info">
                <h2 className="CardSong-title">{title}</h2>
                <p className="CardSong-artist">{artist}</p>
                <p className="CardSong-album">{album}</p>
            </div>
        </div>
    );
}
