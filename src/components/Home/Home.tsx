import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import './Home.css';

interface CardProps {
  title: string;
  content: string;
  image?: string;
  link?: string;
}

interface Song {
  id: number;
  name: string;
  artist: string;
  image: string;
}

interface Artist {
  id: number;
  name: string;
  bio: string;
  website: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, content, image, link }) => (
  <div className="card">
    {image && <img src={image} alt={title} className="card-image" />}
    <div className="card-content">
      <h3>{title}</h3>
      <p>{content}</p>
      {link && <a href={link} target="_blank" rel="noopener noreferrer">Más información</a>}
    </div>
  </div>
);

const Home: React.FC = () => {
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
          <Card
            title="Nuevos lanzamientos musicales de esta semana"
            content="¡Consulta los lanzamientos más recientes de tus artistas favoritos!"
          />
          <Card
            title="Tendencias musicales en 2024"
            content="Explora los géneros y artistas más populares del año."
          />
        </div>
      </section>

      <section className="section songs">
        <h2>Top Canciones</h2>
        <div className="card-container">
          {isSongsLoading && <p>Cargando canciones...</p>}
          {isSongsError && <p>Error al cargar las canciones.</p>}
          {topSongs.map((song: Song) => (
            <Card
              key={song.id}
              title={song.name}
              content={`Artista: ${song.artist}`}
              image={song.image}
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
            <Card
              key={artist.id}
              title={artist.name}
              content={artist.bio}
              image={artist.image}
              link={artist.website}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
