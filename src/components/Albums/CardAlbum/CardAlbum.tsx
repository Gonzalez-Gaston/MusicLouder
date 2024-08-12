import { useState } from 'react';
import { Album } from "../Albums";
import "./CardAlbum.css";
import { useAuth } from '../../../context/auth_context';

interface CardAlbumProps extends Album {
    onClick: () => void;
}

export function CardAlbum({ id, cover, title, year, owner, onClick }: CardAlbumProps) {
    const { isAuthenticated, user,token }: any = useAuth("state");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(prevState => !prevState);
    };

    const handleEdit = () => {
        console.log('Editar álbum');
        setIsMenuOpen(false);
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este álbum?')) {
            try {
                const response = await fetch(
                    `https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}`,
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
        <div className="card-album" onClick={onClick}>
            <img
                src={cover == null ? "../public/logo.jpeg" : cover}
                alt=""
                className="card-album-image"
            />
            <div className="card-album-info">
                <h2 className="card-album-title">{title}</h2>
                <p className="card-album-year">{year}</p>
            </div>
            {
                isAuthenticated && owner === user?.user__id && (
                    <>
                        <button className="card-album-menu-button" onClick={handleMenuToggle}>
                            <img
                                src="public/1486506267-grid-home-menu-options-squares-table_81451.png"
                                alt="Menú"
                                className="button-icon"
                            />
                        </button>
                        {isMenuOpen && (
                            <div className="card-album-menu">
                                <button className="card-album-menu-item" onClick={handleEdit}>
                                    <img
                                        src="public/pen_edit_modify_pencil_icon_181536.png"
                                        alt="Editar"
                                        className="icon"
                                    />
                                    Editar
                                </button>
                                <button className="card-album-menu-item" onClick={handleDelete}>
                                    <img
                                        src="public/delete_remove_close_icon_181533.png"
                                        alt="Eliminar"
                                        className="icon"
                                    />
                                    Eliminar
                                </button>
                                <button className="card-album-menu-item" onClick={handleAddToPlaylist}>
                                    <img
                                        src="public/plus_insert_add_new_icon_181537.png"
                                        alt="Agregar a la playlist"
                                        className="icon"
                                    />
                                    Agregar a la playlist
                                </button>
                            </div>

                        )
                        }
                    </>
                )}
        </div>
    );
}
