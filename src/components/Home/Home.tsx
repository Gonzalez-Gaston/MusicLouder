import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { CardSong } from '../Songs/CardSong/CardSong';
import { ArtistCard } from '../Artists/ArtistCard/ArtistCard';
import './Home.css';

// Define los tipos directamente aquí
type Song = {
  id: number;
  title: string;
  artist: number[]; // Cambia a number[] para coincidir con la definición de Song en Song.tsx
  album: number;    // Cambia a number para coincidir con la definición de Song en Song.tsx
  cover: string;
};

type Artist = {
  id: number;
  name: string;
  bio: string;
  website: string;
  image: string;
};

const Home = () => {
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
  }, [fetchSongs, fetchArtists]);

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
        <div className="card-container">
          {/* Aquí se utilizan CardSong para mostrar noticias */}
          <CardSong
            cover="../public/logo.jpeg"
            title="Nuevos lanzamientos musicales de esta semana"
            artist=""
            album=""
            onClick={() => {}}
          />
          <CardSong
            cover="../public/logo.jpeg"
            title="Tendencias musicales en 2024"
            artist=""
            album=""
            onClick={() => {}}
          />
        </div>
      </section>

      <section className="section songs">
        <h2>Top Canciones</h2>
        <div className="card-container">
          {isSongsLoading && <p>Cargando canciones...</p>}
          {isSongsError && <p>Error al cargar las canciones.</p>}
          {topSongs.map((song) => (
            <CardSong
              key={song.id}
              cover={song.cover}
              title={song.title}
              artist={song.artist.join(', ')}
              album={song.album.toString()}
              onClick={() => {}}
            />
          ))}
        </div>
      </section>

      <section className="section artists">
        <h2>Artistas Destacados</h2>
        <div className="card-container">
          {isArtistsLoading && <p>Cargando artistas...</p>}
          {isArtistsError && <p>Error al cargar los artistas.</p>}
          {topArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              name={artist.name}
              bio={artist.bio}
              website={artist.website}
              image={artist.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
