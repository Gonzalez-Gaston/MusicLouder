import { NavBar } from "./NavBar/NavBar";
import "./Layout.css";
import { SideNav } from "./SideNav/SideNav";
import { AudioPlayer } from "./FooterBar/FooterBar";
import { Outlet } from "react-router-dom";
import { useAudioPlayer } from "../../context/audio_player_context";

export function Layout() {
    const { src, isPlaying, onEnded } = useAudioPlayer();
    return (
        <div className="layout">
            <NavBar />
            <div className="container">
                <SideNav />
                <div className="container-outlet">
                    <Outlet />
                </div>
            </div>
            <AudioPlayer src={src} isPlaying={isPlaying} onEnded={onEnded}/>
        </div>
    )
}