import { useState, useEffect } from 'react';
import { CardSong } from './CardSong/CardSong';
import { AudioPlayer } from './AudioPlayer/AudioPlayer';
import { useFetch } from '../../hooks/useFetch';
import './Songs.css';

export interface Song {
    id: number;
    title: string;
    artist: number[];
    genres: number[];
    duration: number;
    owner: number;
    view_count: number;
    album: number;
    cover: string;
    song_file: string;
    created_at: Date;
    updated_at: Date;
    year: number;
}

export function Songs() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);


    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/songs/",
        {}
    );

    useEffect(() => {
        doFetch({ page, page_size: pageSize }); 
    }, [page, pageSize]); 

    const handleCardClick = (song: Song) => {
        setCurrentSong(song);
    };

    const handleAudioEnded = () => {
        setCurrentSong(null);
    };

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!data || !data.results) return <p>No hay canciones disponibles</p>;

    return (
        <div className="songs-container">
            {data.results.map((item: Song) => (
                <CardSong
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    {...item}
                />
            ))}
            <div className="pagination-controls">
                <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Anterior</button>
                <button onClick={() => setPage(prevPage => (data.next ? prevPage + 1 : prevPage))}>Siguiente</button>
            </div>
            {currentSong && (
                <AudioPlayer
                    src={currentSong.song_file} // Usando song_file para el audio
                    isPlaying={true}
                    onEnded={handleAudioEnded}
                />
            )}
        </div>
    );

}

