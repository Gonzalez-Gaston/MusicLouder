import { useState } from 'react';
import { Album } from "../Albums";
import "./CardAlbum.css";

export function CardAlbum(album: Album) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que el menú se cierre al hacer clic dentro
        setIsMenuOpen(prevState => !prevState);
    };

    const handleEdit = () => {
        console.log('Editar álbum');
        setIsMenuOpen(false);
    };

    const handleDelete = () => {
        console.log('Eliminar álbum');
        setIsMenuOpen(false);
    };

    const handleAddToPlaylist = () => {
        console.log('Agregar a la playlist');
        setIsMenuOpen(false);
    };

    return (
        <div className="card-album">
            <img
                src={album.cover == null ? "../public/logo.jpeg" : album.cover}
                alt=""
                className="card-album-image"
            />
            <div className="card-album-info">
                <h2 className="card-album-title">{album.title}</h2>
                <p className="card-album-year">{album.year}</p>
            </div>
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
            )}
        </div>
    );
}
