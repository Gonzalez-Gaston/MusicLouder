import './CardSong.css';

export function CardSong() {
    return (
        <div className="CardSong">
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkT6fnreuWwFFn_Bk9w0h9OVAgyso_Zw0QXg&s" 
                alt="Song album cover" 
                className="CardSong-image" 
            />
            <div className="CardSong-info">
                <h2 className="CardSong-title">Song Title</h2>
                <p className="CardSong-artist">Artist Name</p>
                <p className="CardSong-album">Album Name</p>
            </div>
        </div>
    );
}