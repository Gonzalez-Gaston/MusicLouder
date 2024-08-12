import "./AddArtistCard.css";

interface AddArtistCardProps {
  onClick: () => void;
}

export function AddArtistCard({ onClick }: AddArtistCardProps) {
  return (
    <div className="artist-card add-artist-card" onClick={onClick}>
      <div className="add-artist-icon">
        <img
          src="../public/addIcon3.svg"
          alt="Agregar"
          className="button-icon"
        />
      </div>
      <div className="add-artist-text">
        <h2 className="CardSong-title">Añadir Artista</h2>
      </div>
    </div>
  );
}
