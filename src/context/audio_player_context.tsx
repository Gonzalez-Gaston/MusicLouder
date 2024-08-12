// audio_player_context.tsx
import React, { createContext, useContext, useState } from 'react';

interface AudioPlayerContextProps {
    src: string;
    isPlaying: boolean;
    playSong: (url: string) => void;
    pauseSong: () => void;
    stopSong: () => void;
    onEnded: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
    const [src, setSrc] = useState<string>('');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const playSong = (url: string) => {
        setSrc(url);
        setIsPlaying(true);
    };

    const pauseSong = () => {
        setIsPlaying(false);
    };

    const stopSong = () => {
        setIsPlaying(false);
        setSrc('');
    };

    const onEnded = () => {
        setIsPlaying(false);
    };

    return (
        <AudioPlayerContext.Provider value={{ src, isPlaying, playSong, pauseSong, stopSong, onEnded }}>
            {children}
        </AudioPlayerContext.Provider>
    );
}

export function useAudioPlayer() {
    const context = useContext(AudioPlayerContext);
    if (context === undefined) {
        throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
    }
    return context;
}
