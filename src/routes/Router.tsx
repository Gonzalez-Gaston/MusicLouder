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
                    element: (
                        <Home />
                    ),
                },
                {
                    path: "/playlist",
                    element: (
                        <PlayList />
                    ),
                    
                },
                {
                    path: "/songs",
                    element: (
                        <Songs />
                    ),
                    // children: [
                    //     {
                    //         path: ":id",
                    //         element: (
                    //             <Songs />
                    //         ),
                    //     }
                    // ]
                },
                {
                    path: "/albums",
                    element: (
                        <Albums />
                    ),
                },
                {
                    path: "/artists",
                    element: (
                        <Artists />
                    ),
                },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ],
    // {
    //     basename: "/react_context",
    // }
);
