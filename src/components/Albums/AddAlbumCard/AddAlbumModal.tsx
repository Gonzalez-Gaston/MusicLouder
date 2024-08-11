import { useState, FormEvent } from "react";
import "./AddAlbumModal.css";

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAlbumModal({ isOpen, onClose }: AddAlbumModalProps) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [year, setYear] = useState("");

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCover(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title && artist && cover && year) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("cover", cover);
      formData.append("year", year);

      console.log("Album form submitted", formData);
    } else {
      alert("Please fill in all fields");
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Añadir Nuevo Álbum</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Artista:
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </label>
          <label>
            Carátula del Álbum:
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              required
            />
          </label>
          <label>
            Año:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
