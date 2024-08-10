import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/Home/Home";
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

export const Router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/playlist",
          element: <PlayList />,
        },
        {
          path: "/songs",
          element: <Songs />,
        },
        {
          path: "/songs/create",
          element: <SongForm />,
        },
        {
          path: "/albums",
          element: <Albums />,
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
