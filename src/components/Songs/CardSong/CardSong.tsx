import './CardSong.css';

interface CardSongProps {
    title: string;
    artist: string;
    album: string;
    image: string;
}

export function CardSong({ title, artist, album, image }: CardSongProps) {
    return (
        <div className="CardSong">
            <img src={image} alt={`Album cover for ${title}`} className="CardSong-image" />
            <div className="CardSong-info">
                <h2 className="CardSong-title">{title}</h2>
                <p className="CardSong-artist">{artist}</p>
                <p className="CardSong-album">{album}</p>
            </div>
        </div>
    );
}
