import "./AddAlbumCard.css";

interface AddAlbumCardProps {
  onClick: () => void;
}

export function AddAlbumCard({ onClick }: AddAlbumCardProps) {
  return (
    <div className="card-album add-album-card" onClick={onClick}>
      <div className="add-album-icon">+</div>
      <div className="add-album-text">Añadir Álbum</div>
    </div>
  );
}
