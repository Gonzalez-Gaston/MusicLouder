import { useState, FormEvent } from "react";
import { useAuth } from "../../../context/auth_context";
import { useNavigate } from "react-router-dom";
import "./AddArtistModal.css";

interface AddArtistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddArtistModal({ isOpen, onClose }: AddArtistModalProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [website, setWebsite] = useState("");
  const { isAuthenticated, token }: any = useAuth("state");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isAuthenticated) {
      const artistData = {
        name: name,
        bio: bio,
        //image,
        website: website,
      };

      try {
        const response = await fetch(
          "https://sandbox.academiadevelopers.com/harmonyhub/artists/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(artistData),
          }
        );

        if (response.ok) {
          console.log("Artist created successfully");
          onClose();
        } else {
          console.error("Failed to create artist");
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
        <h2>Añadir Nuevo Artista</h2>
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
            Imagen URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
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
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
