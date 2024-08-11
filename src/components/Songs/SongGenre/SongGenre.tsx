import { useState, useEffect } from "react";
import "./SongGenre.css";
import { useParams } from "react-router-dom";
import { Song } from "../../Songs/Songs";
import { CardSong } from "../../Songs/CardSong/CardSong";
import { AudioPlayer } from "../../Songs/AudioPlayer/AudioPlayer";
import { useFetch } from "../../../hooks/useFetch";

export function SongGenre() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const { id } = useParams();

  const url = `https://sandbox.academiadevelopers.com/harmonyhub/songs/?genres=${id}&page=${page}&page_size=${pageSize}`;

  const [{ data, isError, isLoading }, doFetch] = useFetch(url, {});

  useEffect(() => {
    doFetch({});
  }, [id, page, pageSize]);

  const handleCardClick = (song: Song) => {
    setCurrentSong(song);
  };

  const handleAudioEnded = () => {
    setCurrentSong(null);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar las canciones.</p>;
  if (!data || !data.results) return <p>No hay canciones disponibles</p>;

  return (
    <div className="songs-container">
      <div className="cards-pagination-container">
        <div className="cards-container">
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
            onClick={() =>
              setPage((prevPage) => (data.next ? prevPage + 1 : prevPage))
            }
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
    </div>
  );
}
