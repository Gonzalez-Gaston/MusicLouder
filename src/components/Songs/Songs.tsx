import { useState, useEffect } from 'react';
import { CardSong } from './CardSong/CardSong';
import './CardSong/CardSong.css';
import './Songs.css';

interface Song {
    title: string;
    artist: string;
    album: string;
    cover: string;
}

export function Songs() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 8;

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/songs?page_size=181');
            const data = await response.json();

            if (data && data.results) {
                setSongs(data.results); 
            } else {
                console.error('Estructura de datos no esperada:', data);
            }
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

    const totalPages = Math.ceil(songs.length / songsPerPage);

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
        <div className="songs-container">
            {currentSongs.map((song, index) => (
                <CardSong
                    key={index}
                    title={song.title}
                    artist={song.artist}
                    album={song.album}
                    image={song.cover}
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
