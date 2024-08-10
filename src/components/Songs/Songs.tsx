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

    return (
        <div className="songs-container">
            {songs.map((song, index) => (
                <CardSong
                    key={index}
                    title={song.title}
                    artist={song.artist}
                    album={song.album}
                    image={song.cover}
                />
            ))}
        </div>
    );
}
