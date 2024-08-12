import React, { useState } from 'react';
import './SongForm.css';
import { useAuth } from '../../../context/auth_context';

export function SongForm() {
    const [title, setTitle] = useState('');
    const [year, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const { isAuthenticated, token }: any = useAuth("state");
    // const [songFile, setSongFile] = useState<File | null>(null);

    // const handleSongFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setSongFile(e.target.files[0]);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (title && year && album) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('artist', year);
            formData.append('album', album);
            // formData.append('songFile', songFile);

            try {
                const response = await fetch(
                    "https://sandbox.academiadevelopers.com/harmonyhub/songs/",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                        body: formData,
                    }
                );

                if (response.ok) {
                    console.log("Song saved successfully");
                    //   onClose();
                } else {
                    console.error("Failed to save song");
                }
            } catch (error) {
                console.error("Error:", error);
            }
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
                Año:
                <input type="text" value={year} onChange={(e) => setArtist(e.target.value)} required />
            </label>
            <label>
                Álbum:
                <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} required />
            </label>
            {/* <label>
                Archivo de Canción:
                <input type="file" accept="audio/*" onChange={handleSongFileChange} required />
            </label> */}
            <button type="submit">Crear Canción</button>
        </form>
    );
}
