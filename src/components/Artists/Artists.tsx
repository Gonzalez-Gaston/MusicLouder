import { useState, useEffect } from 'react';
import { ArtistCard } from './ArtistCard/ArtistCard';
import './ArtistCard/ArtistCard.css';
import './Artists.css';
import { useFetch } from '../../hooks/useFetch';

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
    const [pageSize] = useState(8); // 8 tarjetas por página

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/artists/",
        {}
    );

    useEffect(() => {
        doFetch({ page, page_size: pageSize });
    }, [page, pageSize]);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los artistas.</p>;
    if (!data || !data.results) return <p>No hay artistas disponibles</p>;

    return (
        <div className="artists-container">
            {data.results.map((item: Artist) => (
                <ArtistCard
                    key={item.id}
                    {...item}
                />
            ))}
            <div className="pagination">
                <button
                    onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                >
                    &lt;
                </button>
                <button
                    onClick={() => setPage(prevPage => (data.next ? prevPage + 1 : prevPage))}
                    disabled={!data.next}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}
