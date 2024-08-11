import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CardAlbum } from "./CardAlbum/CardAlbum";
import { AddAlbumCard } from "./AddAlbumCard/AddAlbumCard";
import { AddAlbumModal } from "./AddAlbumCard/AddAlbumModal";
import "./Albums.css";

export interface Album {
  id: number;
  title: string;
  artist: number;
  cover: string;
  year: number;
  created_at: Date;
  updated_at: Date;
}

export function Albums() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/harmonyhub/albums/",
    {}
  );

  useEffect(() => {
    doFetch({ page, page_size: pageSize });
  }, [page, pageSize]);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los álbumes.</p>;
  if (!data) return <p>No hay álbumes disponibles</p>;

  return (
    <div className="albums-container">
      <AddAlbumCard onClick={() => setIsModalOpen(true)} />
      {data.results.map((item: Album) => (
        <CardAlbum key={item.id} {...item} />
      ))}
      <AddAlbumModal
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
