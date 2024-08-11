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
  const [pageSize] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/harmonyhub/artists/",
    {}
  );

  useEffect(() => {
    doFetch({ page, page_size: pageSize });
  }, [page, pageSize]);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar las canciones.</p>;
  if (!data || !data.results) return <p>No hay canciones disponibles</p>;

  return (
    <div className="artists-container">
      <AddArtistCard onClick={() => setIsModalOpen(true)} />
      {data.results.map((item: Artist) => (
        <ArtistCard key={item.id} onClick={() => null} {...item} />
      ))}
      <AddArtistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="pagination-controls">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        >
          Anterior
        </button>
        <button
          onClick={() =>
            setPage((prevPage) => (data.next ? prevPage + 1 : prevPage))
          }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
