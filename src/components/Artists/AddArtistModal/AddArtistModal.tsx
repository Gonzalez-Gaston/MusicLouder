import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "../../../context/auth_context";
import { useNavigate } from "react-router-dom";
import "./AddArtistModal.css";
import { Artist } from "../Artists";

interface AddArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist?: Artist | null;
}

export function AddArtistModal({
  isOpen,
  onClose,
  artist,
}: AddArtistModalProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [website, setWebsite] = useState("");
  const { isAuthenticated, token }: any = useAuth("state");
  const navigate = useNavigate();

  useEffect(() => {
    if (artist) {
      setName(artist.name);
      setBio(artist.bio);
      setWebsite(artist.website);
      setImage(null);
    }
  }, [artist]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isAuthenticated) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("website", website);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          artist
            ? `https://sandbox.academiadevelopers.com/harmonyhub/artists/${artist.id}/`
            : "https://sandbox.academiadevelopers.com/harmonyhub/artists/",
          {
            method: artist ? "PUT" : "POST",
            headers: {
              Authorization: `Token ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          console.log("Artist saved successfully");
          onClose();
        } else {
          console.error("Failed to save artist");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      navigate("/login");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{artist ? "Editar Artista" : "Añadir Nuevo Artista"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Biografía:
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </label>
          <label>
            Imagen:
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </label>
          <label>
            Sitio Web:
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </label>
          <button type="submit">
            {artist ? "Guardar Cambios" : "Guardar"}
          </button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
