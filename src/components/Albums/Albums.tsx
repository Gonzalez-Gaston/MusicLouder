import { useEffect } from "react";
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
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/albums/",
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

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
        </div>
    );
}