import { useState, FormEvent } from "react";
import "./AddArtistModal.css";
import { useAuth } from "../../../context/auth_context";
import { useNavigate } from "react-router-dom";

interface AddArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddArtistModal({ isOpen, onClose }: AddArtistModalProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [website, setWebsite] = useState("");
  const { isAuthenticated }: any = useAuth("state");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onClose();
  };

  if(!isAuthenticated){
    navigate("/login")
  } 

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Añadir Nuevo Artista</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Biografía:
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <label>
            Imagen URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <label>
            Sitio Web:
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
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
