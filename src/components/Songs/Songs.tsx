import { useState, useEffect } from "react";
import { CardSong } from "./CardSong/CardSong";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { SongForm } from "./SongForm/Songform";
import { useFetch } from "../../hooks/useFetch";
import "./Songs.css";

export interface Song {
  id: number;
  title: string;
  artist: number[];
  genres: number[];
  duration: number;
  owner: number;
  view_count: number;
  album: number;
  cover: string;
  song_file: string;
  created_at: Date;
  updated_at: Date;
  year: number;
}

export function Songs() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/harmonyhub/songs/",
    {}
  );

  useEffect(() => {
    doFetch({ page, page_size: pageSize });
  }, [page, pageSize]);

  const handleCardClick = (song: Song) => {
    setCurrentSong(song);
  };

  const handleAudioEnded = () => {
    setCurrentSong(null);
  };

  const handleAddSongClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log(data);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar las canciones.</p>;
  if (!data || !data.results) return <p>No hay canciones disponibles</p>;

  return (
    <div className="songs-container">
      <div className="cards-pagination-container">
        <div className="cards-container">
          <div className="card add-song-card" onClick={handleAddSongClick}>
            <img
              src="../public/addIcon3.svg"
              alt="Agregar cancion"
              className="add-song-icon"
            />
          </div>
          {data.results.map((item: Song) => (
            <CardSong
              key={item.id}
              onClick={() => handleCardClick(item)}
              {...item}
            />
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
      {currentSong && (
        <AudioPlayer
          src={currentSong.song_file}
          isPlaying={true}
          onEnded={handleAudioEnded}
        />
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              ×
            </span>
            <SongForm />
            <button className="cancel-button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
