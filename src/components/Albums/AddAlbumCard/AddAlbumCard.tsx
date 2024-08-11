import "./AddAlbumCard.css";

interface AddAlbumCardProps {
  onClick: () => void;
}

export function AddAlbumCard({ onClick }: AddAlbumCardProps) {
  return (
    <div className="card-album add-album-card" onClick={onClick}>
      <div className="add-album-icon">
        <img
          src="../public/addIcon3.svg"
          alt="Agregar"
          className="button-icon"
        />
      </div>
      <div className="add-album-text">
        <h2 className="CardSong-title">Añadir Album</h2>
      </div>
    </div>
  );
}
