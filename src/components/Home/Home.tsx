import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import './Home.css';
import { Artist } from '../Artists/Artists';
import { Song } from '../Songs/Songs';
import { CardSong } from '../Songs/CardSong/CardSong';
import { ArtistCard } from '../Artists/ArtistCard/ArtistCard';

export function Home(){
  const [topSongs, setTopSongs] = useState<Song[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  const [{ data: songsData, isError: isSongsError, isLoading: isSongsLoading }, fetchSongs] = useFetch(
    'https://sandbox.academiadevelopers.com/harmonyhub/songs/',
    {}
  );

  const [{ data: artistsData, isError: isArtistsError, isLoading: isArtistsLoading }, fetchArtists] = useFetch(
    'https://sandbox.academiadevelopers.com/harmonyhub/artists/',
    {}
  );

  useEffect(() => {
    fetchSongs();
    fetchArtists();
  }, []); 

  useEffect(() => {
    if (songsData?.results) {
      setTopSongs(songsData.results.slice(0, 4));
    }
  }, [songsData]);

  useEffect(() => {
    if (artistsData?.results) {
      setTopArtists(artistsData.results.slice(0, 4));
    }
  }, [artistsData]);

  return (
    <div className="home">
      <header className="header">
        <h1>¡Bienvenido a MusicLouder!</h1>
        <p>Tu destino definitivo para lo último en música.</p>
      </header>
      
      <section className="section news">
        <h2>Noticias musicales y nuevos lanzamientos</h2>
      </section>

      <section className="section songs">
        <h2>Top Canciones</h2>
        <div className="card-container">
          {isSongsLoading && <p>Cargando canciones...</p>}
          {isSongsError && <p>Error al cargar las canciones.</p>}
          {topSongs.map((song: Song) => (
            <CardSong
              key={song.id}
              onClick={() => null}
              {...song}
            />
          ))}
        </div>
      </section>

      <section className="section artists">
        <h2>Artistas Destacados</h2>
        <div className="card-container">
          {isArtistsLoading && <p>Cargando artistas...</p>}
          {isArtistsError && <p>Error al cargar los artistas.</p>}
          {topArtists.map((artist: Artist) => (
            <ArtistCard
              key={artist.id}
              {...artist}
              onClick={() => null}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

