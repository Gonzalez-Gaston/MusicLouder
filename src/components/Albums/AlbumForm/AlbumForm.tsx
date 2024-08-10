import React, { useState } from 'react';
import './AlbumForm.css';

export function AlbumForm() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [cover, setCover] = useState<File | null>(null);

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCover(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (title && artist && cover) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('artist', artist);
            formData.append('cover', cover);

            //lógica para enviar los datos al backend
            console.log('Album form submitted');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <form className="album-form" onSubmit={handleSubmit}>
            <label>
                Título:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Artista:
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />
            </label>
            <label>
                Carátula del Álbum:
                <input type="file" accept="image/*" onChange={handleCoverChange} required />
            </label>
            <button type="submit">Crear Álbum</button>
        </form>
    );
}
