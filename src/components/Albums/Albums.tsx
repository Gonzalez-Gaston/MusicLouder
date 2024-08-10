import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CardAlbum } from "./CardAlbum/CardAlbum";
import "./Albums.css";  

export interface Album {
    id: number;
    title: string;
    artist: number;
    cover: string;
    year: number;
    created_at: Date;
    updated_at: Date
}

export function Albums(){
    const [page, setPage] = useState(1);
    const [pageSize] = useState(9);
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/albums/",
        {}
    );

    useEffect(() => {
        doFetch({ page, page_size: pageSize }); 
    }, [page, pageSize]); 

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los albumes.</p>;
    if (!data) return <p>No hay albumes disponibles</p>;
    
    return (
        <div className="albums-container">
            {data.results.map((item: Album) => (
                <CardAlbum
                    key={item.id}
                    {...item}
                />
            ))}
            <div className="pagination-controls">
                <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Anterior</button>
                <button onClick={() => setPage(prevPage => (data.next ? prevPage + 1 : prevPage))}>Siguiente</button>
            </div>
        </div>
        
    );
}