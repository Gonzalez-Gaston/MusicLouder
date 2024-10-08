import { createBrowserRouter } from "react-router-dom";
import Home from '../components/Home/Home';
import { PlayList } from "../components/PlayList/PlayList";
import { Layout } from "../components/Layout/Layout";
import { NotFound } from "../components/NotFound/NotFound";
import { Login } from "../components/Login/Login";
import { Register } from "../components/Register/Register";
import { Songs } from "../components/Songs/Songs";
import { Albums } from "../components/Albums/Albums";
import { Artists } from "../components/Artists/Artists";
import { SongForm } from "../components/Songs/SongForm/Songform";
import { ArtistForm } from "../components/Artists/ArtistForm/ArtistForm";
import { AlbumForm } from "../components/Albums/AlbumForm/AlbumForm";
import { AuthProvider } from "../context/auth_context";
import ProtectedRoute from "./ProtectedRoutes";
import { SongsByAlbum } from "../components/Albums/SongByAlbum/SongsByAlbum";
import { SongGenre } from "../components/Songs/SongGenre/SongGenre";
import { AudioPlayerProvider } from "../context/audio_player_context";

export const Router = createBrowserRouter(
  [
    {
      path: "/login",
      element:
        <AuthProvider>
          <Login />,
        </AuthProvider>
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element:
        <AuthProvider>
          <AudioPlayerProvider>
            <Layout />
          </AudioPlayerProvider>
        </AuthProvider>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/playlist",
          element:
            <ProtectedRoute>
              <PlayList />,
            </ProtectedRoute>
        },
        {
          path: "/songs",
          children: [
            {
              index: true,
              element: <Songs />,
            },
            {
              path: "genre/:id",
              element: <SongGenre />,
            },

          ]
        },
        {
          path: "/songs/create",
          element: <SongForm />,
        },
        {
          path: "/albums",
          children: [
            {
              index: true,
              path: "",
              element: <Albums />
            },
            {
              path: ":id",
              element: <SongsByAlbum />
            },

          ]
        },
        {
          path: "/albums/create",
          element: <AlbumForm />,
        },
        {
          path: "/artists",
          element: <Artists />,
        },
        {
          path: "/artists/create",
          element: <ArtistForm />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]
  // {
  //     basename: "/react_context",
  // }
);
