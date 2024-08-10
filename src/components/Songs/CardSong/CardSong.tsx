import './CardSong.css';

interface CardSongProps {
    title: string;
    artist: string;
    album: string;
    image: string;
    onClick: () => void;
}

export function CardSong({ title, artist, album, image, onClick }: CardSongProps) {
    return (
        <div className="CardSong" onClick={onClick}> {/* Agregar el manejador de clic */}
            <img src={image} alt={`Album cover for ${title}`} className="CardSong-image" />
            <div className="CardSong-info">
                <h2 className="CardSong-title">{title}</h2>
                <p className="CardSong-artist">{artist}</p>
                <p className="CardSong-album">{album}</p>
            </div>
        </div>
    );
}
