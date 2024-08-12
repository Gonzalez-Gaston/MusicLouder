import { useState } from "react";
import { Artist } from "../Artists";
import "./ArtistCard.css";
import { useAuth } from "../../../context/auth_context";

interface ArtistCardProps extends Artist {
  onClick: (artist: Artist) => void;
  artist: Artist
}


export function ArtistCard({
  image,
  name,
  website,
  owner,
  onClick,
  artist
}: ArtistCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user }: any = useAuth("state");

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleEdit = () => {
    onClick(artist);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    console.log("Eliminar artista");
    setIsMenuOpen(false);
  };

  return (
    <div className="artist-card" onClick={() => onClick(artist)}>
      <img
        src={image === null ? "../public/logo.jpeg" : image}
        alt={`Imagen de ${name}`}
        className="artist-card-image"
      />
      <div className="artist-card-info">
        <h2 className="artist-card-name">{name}</h2>
        <a
          href={website}
          className="artist-card-website"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sitio Web
        </a>
      </div>
      {isAuthenticated && owner === user?.user__id && (
        <>
          {" "}
          <button
            className="artist-card-menu-button"
            onClick={handleMenuToggle}
          >
            <img
              src="public/1486506267-grid-home-menu-options-squares-table_81451.png"
              alt="Menú"
              className="button-icon"
            />
          </button>
          {isMenuOpen && (
            <div className="artist-card-menu">
              <button className="artist-card-menu-item" onClick={handleEdit}>
                <img
                  src="public/pen_edit_modify_pencil_icon_181536.png"
                  alt="Editar"
                  className="icon"
                />
                Editar
              </button>
              <button className="artist-card-menu-item" onClick={handleDelete}>
                <img
                  src="public/delete_remove_close_icon_181533.png"
                  alt="Eliminar"
                  className="icon"
                />
                Eliminar
              </button>
              <button className="artist-card-menu-item" onClick={handleDelete}>
                <img
                  src="public/plus_insert_add_new_icon_181537.png"
                  alt="Agregar"
                  className="icon"
                />
                Agregar a la playlist
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
