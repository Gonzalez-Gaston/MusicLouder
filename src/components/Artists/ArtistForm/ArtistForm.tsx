import React, { useState } from 'react';
import './ArtistForm.css';

export function ArtistForm() {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name && bio && website && image) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('bio', bio);
            formData.append('website', website);
            formData.append('image', image);

            // Aquí iría la lógica para enviar los datos al backend
            console.log('Artist form submitted');
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <form className="artist-form" onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Biografía:
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
            </label>
            <label>
                Página web:
                <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} required />
            </label>
            <label>
                Imagen del Artista:
                <input type="file" accept="image/*" onChange={handleImageChange} required />
            </label>
            <button type="submit">Crear Artista</button>
        </form>
    );
}
