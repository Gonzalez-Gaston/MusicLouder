import { useState } from 'react';
import { Song } from '../Songs';
import './CardSong.css';

interface CardSongProps extends Song {
    onClick: () => void; // Agrega el tipo para el manejador de clic
}

export function CardSong({ cover, title, artist, album, onClick }: CardSongProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que el clic en el botón de menú propague al contenedor de la tarjeta
        setIsMenuOpen(prevState => !prevState);
    };

    const handleEdit = () => {
        // Lógica para editar la canción
        console.log('Editar canción');
        setIsMenuOpen(false); // Cierra el menú después de seleccionar una opción
    };

    const handleDelete = () => {
        // Lógica para eliminar la canción
        console.log('Eliminar canción');
        setIsMenuOpen(false); // Cierra el menú después de seleccionar una opción
    };

    return (
        <div className="card-song" onClick={onClick}>
            <img src={cover || "../public/logo.jpeg"} alt={`Album cover for ${title}`} className="card-song-image" />
            <div className="card-song-info">
                <h2 className="card-song-title">{title}</h2>
                <p className="card-song-artist">{artist}</p>
                <p className="card-song-album">{album}</p>
            </div>
            <button className="card-song-menu-button" onClick={handleMenuToggle}>
                <img src="public\1486506267-grid-home-menu-options-squares-table_81451.png" alt="Menú" className="button-icon" />
            </button>
            {isMenuOpen && (
                <div className="card-song-menu">
                    <button className="card-song-menu-item" onClick={handleEdit}>
                        {/* Aquí deberías colocar el icono para editar */}
                        <img src="public\pen_edit_modify_pencil_icon_181536.png" alt="Editar" className="icon" />
                        Editar
                    </button>
                    <button className="card-song-menu-item" onClick={handleDelete}>
                        {/* Aquí deberías colocar el icono para eliminar */}
                        <img src="public\delete_remove_close_icon_181533.png" alt="Eliminar" className="icon" />
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}
