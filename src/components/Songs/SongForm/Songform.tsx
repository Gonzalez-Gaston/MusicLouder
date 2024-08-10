import React, { useState } from 'react';
import './SongForm.css';

export function SongForm() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [songFile, setSongFile] = useState<File | null>(null);

    const handleSongFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSongFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (title && artist && album && songFile) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('artist', artist);
            formData.append('album', album);
            formData.append('songFile', songFile);

            // Aquí iría la lógica para enviar los datos al backend
            console.log('Song form submitted');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <form className="song-form" onSubmit={handleSubmit}>
            <label>
                Título:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Artista:
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
            </label>
            <label>
                Álbum:
                <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} required />
            </label>
            <label>
                Archivo de Canción:
                <input type="file" accept="audio/*" onChange={handleSongFileChange} required />
            </label>
            <button type="submit">Crear Canción</button>
        </form>
    );
}
