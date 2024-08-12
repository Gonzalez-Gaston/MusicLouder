import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CardAlbum } from "./CardAlbum/CardAlbum";
import { AddAlbumCard } from "./AddAlbumCard/AddAlbumCard";
import { AddAlbumModal } from "./AddAlbumCard/AddAlbumModal";
import "./Albums.css";
import { useNavigate } from "react-router-dom";

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
  const [pageSize] = useState(7); // Mostrar 7 tarjetas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/harmonyhub/albums/",
    {}
  );

  useEffect(() => {
    doFetch({ page, page_size: pageSize });
  }, [page, pageSize]);

  const navigate = useNavigate();

  const handleAlbumClick = (id: number) => {
    navigate(`/albums/${id}`);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los álbumes.</p>;
  if (!data || !data.results) return <p>No hay álbumes disponibles</p>;

  return (
    <div className="albums-container">
      <div className="cards-pagination-container">
        <div className="cards-container">
          <AddAlbumCard onClick={() => setIsModalOpen(true)} />
          {data.results.map((item: Album) => (
            <CardAlbum key={item.id} {...item} onClick={() => handleAlbumClick(item.id)}/>
          ))}
        </div>
        <div className="pagination-controls">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={page === 1}
          >
            &lt;
          </button>
          <button
            onClick={() => setPage((prevPage) => (data.next ? prevPage + 1 : prevPage))}
            disabled={!data.next}
          >
            &gt;
          </button>
        </div>
      </div>
      <AddAlbumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
