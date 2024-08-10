import { useState, useEffect } from 'react';
import { ArtistCard } from './ArtistCard/ArtistCard';
import './ArtistCard/ArtistCard.css';
import './Artists.css';

interface Artist {
    name: string;
    bio: string;
    website: string;
    image: string;
    songs: string[];
}

export function Artists() {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const artistsPerPage = 4;

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/artists');
            const data = await response.json();

            if (data && data.results) {
                setArtists(data.results); 
            } else {
                console.error('Estructura de datos no esperada:', data);
            }
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    const currentArtists = artists.slice(indexOfFirstArtist, indexOfLastArtist);

    const totalPages = Math.ceil(artists.length / artistsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="artists-container">
            {currentArtists.map((artist, index) => (
                <ArtistCard
                    key={index}
                    name={artist.name}
                    bio={artist.bio}
                    website={artist.website}
                    image={artist.image}
                />
            ))}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}
