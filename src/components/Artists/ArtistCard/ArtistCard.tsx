import { Artist } from '../Artists';
import './ArtistCard.css';

export function ArtistCard(artist: Artist) {
    return (
        <div className="artist-card">
            <img src={artist.image === null ? "../public/logo.jpeg" : artist.image} alt={`Imagen de ${artist.name}`} className="artist-card-image" />
            <div className="artist-card-info">
                <h2 className="artist-card-name">{artist.name}</h2>
                
                <a href={artist.website} className="artist-card-website" target="_blank" rel="noopener noreferrer">
                    Sitio Web
                </a>
            </div>
        </div>
    );
}
