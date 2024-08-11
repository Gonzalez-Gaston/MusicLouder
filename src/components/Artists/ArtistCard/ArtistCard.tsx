import { useState } from 'react';
import { Artist } from '../Artists';
import './ArtistCard.css';

interface ArtistCardProps extends Artist {
    onClick: () => void; // Agrega el tipo para el manejador de clic
}

export function ArtistCard({ image, name, website, onClick }: ArtistCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que el clic en el botón de menú propague al contenedor de la tarjeta
        setIsMenuOpen(prevState => !prevState);
    };

    const handleEdit = () => {
        // Lógica para editar el artista
        console.log('Editar artista');
        setIsMenuOpen(false); // Cierra el menú después de seleccionar una opción
    };

    const handleDelete = () => {
        // Lógica para eliminar el artista
        console.log('Eliminar artista');
        setIsMenuOpen(false); // Cierra el menú después de seleccionar una opción
    };

    return (
        <div className="artist-card" onClick={onClick}>
            <img src={image === null ? "../public/logo.jpeg" : image} alt={`Imagen de ${name}`} className="artist-card-image" />
            <div className="artist-card-info">
                <h2 className="artist-card-name">{name}</h2>
                <a href={website} className="artist-card-website" target="_blank" rel="noopener noreferrer">
                    Sitio Web
                </a>
            </div>
            <button className="artist-card-menu-button" onClick={handleMenuToggle}>
                <img src="public\1486506267-grid-home-menu-options-squares-table_81451.png" alt="Menú" className="button-icon" />
            </button>
            {isMenuOpen && (
                <div className="artist-card-menu">
                    <button className="artist-card-menu-item" onClick={handleEdit}>
                        {/* Aquí deberías colocar el icono para editar */}
                        <img src="public\pen_edit_modify_pencil_icon_181536.png" alt="Editar" className="icon" />
                        Editar
                    </button>
                    <button className="artist-card-menu-item" onClick={handleDelete}>
                        {/* Aquí deberías colocar el icono para eliminar */}
                        <img src="public\delete_remove_close_icon_181533.png" alt="Eliminar" className="icon" />
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}
