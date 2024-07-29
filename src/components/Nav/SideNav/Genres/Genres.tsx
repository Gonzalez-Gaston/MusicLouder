import json from "./genres.json";
import "./Geners.css"

export function Genres(){
    const genres: {id: number, genre: string}[] = json;

    return (
        <div className="container-genres">
            {
                genres.map(genre => (
                    <div key={genre.id} className="item-genre">
                        {genre.genre}
                    </div>
                ))
            }
        </div>
    );
}