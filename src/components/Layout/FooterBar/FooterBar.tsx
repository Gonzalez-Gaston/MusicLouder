import "./FooterBar.css";

interface AudioPlayerProps {
    src: string;
    isPlaying: boolean;
    onEnded: () => void;
}

export function AudioPlayer({ src, isPlaying, onEnded }: AudioPlayerProps) {
    return (
        <div className="audio-player">
            <audio
                src={src}
                autoPlay={isPlaying}
                controls
                onEnded={onEnded}
            >
                {/* Tu navegador no soporta el elemento de audio. */}
            </audio>
        </div>
    );
}
