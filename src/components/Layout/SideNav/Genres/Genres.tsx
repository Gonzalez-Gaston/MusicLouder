import "./Geners.css"
import { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";

export interface Genre {
    id: number;
    name: string;
    description: string;
    owner: number;
    songs: number[];
    created_at: Date;
    updated_at: Date;
}

export function Genres(){
    const [page] = useState(1);
    const [pageSize] = useState(20);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/genres/",
        {}
    );

    useEffect(() => {
        doFetch({ page, page_size: pageSize }); 
    }, [page, pageSize]); 

    console.log(data);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los albumes.</p>;
    if (!data) return <p>No hay albumes disponibles</p>;

    return (
        <div className="container-genres">
            {
                data.results.map((genre: Genre) => (
                    <div key={genre.id} className="item-genre">
                        {genre.name}
                    </div>
                ))
            }
        </div>
    );
}