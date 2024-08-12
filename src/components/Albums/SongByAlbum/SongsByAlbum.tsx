import { useState, useEffect } from "react";
import "./SongByAlbum.css";
import { useParams } from "react-router-dom";
import { Song } from "../../Songs/Songs";
import { CardSong } from "../../Songs/CardSong/CardSong";
// import { AudioPlayer } from "../../Songs/AudioPlayer/AudioPlayer";
import { useFetch } from "../../../hooks/useFetch";
import { useAudioPlayer } from "../../../context/audio_player_context";

export function SongsByAlbum() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const { src, isPlaying, playSong, pauseSong } = useAudioPlayer();
  const { id } = useParams();

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    `https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/songs/`,
    {}
  );

  const handleCardClick = (song: Song) => {
    if (src === song.song_file && isPlaying) {
      pauseSong();
    } else {
      playSong(song.song_file);
    }
  };

  useEffect(() => {
    doFetch({ page, page_size: pageSize });
  }, [page, pageSize]);


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
            onClick={() => setPage((prevPage) => (data.next ? prevPage + 1 : prevPage))}
            disabled={!data.next}
          >
            &gt;
          </button>
        </div>
      </div>
      
    </div>
  );
}
