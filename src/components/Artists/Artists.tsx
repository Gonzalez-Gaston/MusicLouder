import { useState, useEffect } from "react";
import { ArtistCard } from "./ArtistCard/ArtistCard";
import "./ArtistCard/ArtistCard.css";
import "./Artists.css";
import { useFetch } from "../../hooks/useFetch";
import { AddArtistCard } from "./AddArtistCard/AddArtistCard";
import { AddArtistModal } from "./AddArtistModal/AddArtistModal";

export interface Artist {
  id: number;
  name: string;
  bio: string;
  image: string;
  owner: number;
  songs: string[];
  website: string;
  created_at: Date;
  updated_at: Date;
}

export function Artists() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7); // Mostrar 7 tarjetas por página
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/harmonyhub/artists/",
    {}
  );

  useEffect(() => {
    doFetch({ page, page_size: pageSize });
  }, [page, pageSize]);

  const handleCardClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar las canciones.</p>;
  if (!data || !data.results) return <p>No hay canciones disponibles</p>;

  return (
    <div className="artists-container">
      <div className="cards-pagination-container">
        <div className="cards-container">
          <AddArtistCard onClick={() => { setSelectedArtist(null); setIsModalOpen(true); }} />
          {data.results.map((item: Artist) => (
            <ArtistCard key={item.id} onClick={handleCardClick} {...item} artist={item}/>
          ))}
        </div>
        <div className="pagination-controls">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={page === 1}
          >
            
          </button>
          <button
            onClick={() => setPage((prevPage) => (data.next ? prevPage + 1 : prevPage))}
            disabled={!data.next}
          >
            
          </button>
        </div>
      </div>
      <AddArtistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        artist={selectedArtist}
      />
    </div>
  );
}
