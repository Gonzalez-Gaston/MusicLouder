import './ArtistCard.css';

interface ArtistCardProps {
    name: string;
    bio: string;
    website: string;
    image: string;
}

export function ArtistCard({ name, bio, website, image }: ArtistCardProps) {
    return (
        <div className="artist-card">
            <img src={image} alt={`Imagen de ${name}`} className="artist-card-image" />
            <div className="artist-card-info">
                <h2 className="artist-card-name">{name}</h2>
                <p className="artist-card-bio">{bio}</p>
                <a href={website} className="artist-card-website" target="_blank" rel="noopener noreferrer">
                    Sitio Web
                </a>
            </div>
        </div>
    );
}
