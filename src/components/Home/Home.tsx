import React from 'react';
import './Home.css';

interface CardProps {
  title: string;
  content: string;
  image?: string;
  link?: string;
}

const news = [
  { id: 1, title: 'Nuevos lanzamientos musicales de esta semana', content: '¡Consulta los lanzamientos más recientes de tus artistas favoritos!' },
  { id: 2, title: 'Tendencias musicales en 2024', content: 'Explora los géneros y artistas más populares del año.' },
];

const songs = [
  { id: 1, name: 'Canción Uno', artist: 'Artista Uno', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Canción Dos', artist: 'Artista Dos', image: 'https://via.placeholder.com/150' },
];

const artists = [
  { id: 1, name: 'Artista Uno', bio: 'Biografía del Artista Uno', website: 'https://artistone.com', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Artista Dos', bio: 'Biografía del Artista Dos', website: 'https://artisttwo.com', image: 'https://via.placeholder.com/150' },
];

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
  return (
    <div className="home">
      <header className="header">
        <h1>¡Bienvenido a MusicLouder!</h1>
        <p>Tu destino definitivo para lo último en música.</p>
      </header>
      
      <section className="section news">
        <h2>Noticias musicales y nuevos lanzamientos</h2>
        <div className="card-container">
          {news.map(item => (
            <Card key={item.id} title={item.title} content={item.content} />
          ))}
        </div>
      </section>

      <section className="section songs">
        <h2>Top Canciones</h2>
        <div className="card-container">
          {songs.map(song => (
            <Card key={song.id} title={song.name} content={`Artista: ${song.artist}`} image={song.image} />
          ))}
        </div>
      </section>

      <section className="section artists">
        <h2>Artistas Destacados</h2>
        <div className="card-container">
          {artists.map(artist => (
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
