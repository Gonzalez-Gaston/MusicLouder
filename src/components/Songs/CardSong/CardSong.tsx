import { useState } from 'react';
import { Song } from '../Songs';
import './CardSong.css';
import { useAuth } from '../../../context/auth_context';

interface CardSongProps extends Song {
    onClick: () => void;
}

export function CardSong({ id, cover, title, artist, album, owner, onClick }: CardSongProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, token }: any = useAuth("state");

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(prevState => !prevState);
    };

    const handleEdit = () => {
        console.log('Editar canción');
        setIsMenuOpen(false);
    };

    const handleDelete = async() => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta canción?')) {
            try {
                const response = await fetch(
                    `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Token ${token}`,
                        },
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
            setIsMenuOpen(false);
        }
    };

    const handleAddToPlaylist = () => {
        console.log('Agregar a la playlist');
        setIsMenuOpen(false);
    };

    return (
        <div className="card-song" onClick={onClick}>
            <img src={cover || "../public/logo.jpeg"} alt={`Album cover for ${title}`} className="card-song-image" />
            <div className="card-song-info">
                <h2 className="card-song-title">{title}</h2>
                <p className="card-song-artist">{artist}</p>
                <p className="card-song-album">{album}</p>
            </div>
            {
                isAuthenticated && owner === user?.user__id && (
                    <>
                        <button className="card-song-menu-button" onClick={handleMenuToggle}>
                            <img src="public/1486506267-grid-home-menu-options-squares-table_81451.png" alt="Menú" className="button-icon" />
                        </button>

                        {isMenuOpen && (
                            <div className="card-song-menu">
                                <button className="card-song-menu-item" onClick={handleEdit}>
                                    <img src="public/pen_edit_modify_pencil_icon_181536.png" alt="Editar" className="icon" />
                                    Editar
                                </button>
                                <button className="card-song-menu-item" onClick={handleDelete}>
                                    <img src="public/delete_remove_close_icon_181533.png" alt="Eliminar" className="icon" />
                                    Eliminar
                                </button>
                                <button className="card-song-menu-item" onClick={handleAddToPlaylist}>
                                    <img src="public/plus_insert_add_new_icon_181537.png" alt="Agregar" className="icon" />
                                    Agregar a la playlist
                                </button>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    );
}
