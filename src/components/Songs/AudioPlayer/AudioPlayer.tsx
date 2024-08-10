import React from 'react';

interface AudioPlayerProps {
    src: string;
    isPlaying: boolean;
    onEnded: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isPlaying, onEnded }) => {
    return (
        <div className="audio-player">
            <audio
                src={src}
                autoPlay={isPlaying}
                controls
                onEnded={onEnded}
            >
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    );
};
