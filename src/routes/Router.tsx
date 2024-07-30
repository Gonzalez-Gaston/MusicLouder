import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { PlayList } from "../components/PlayList/PlayList";
import { Layout } from "../components/Layout/Layout";
import { NotFound } from "../components/NotFound/NotFound";
import { Login } from "../components/Login/Login";
import { Register } from "../components/Register/Register";
import { Songs } from "../components/Songs/Songs";

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
                    //         path: ":genero",
                    //         element: (
                    //             <Songs />
                    //         ),
                    //     }
                    // ]
                },
                {
                    path: "/albums",
                    element: (
                        <Songs />
                    ),
                },
                {
                    path: "/artist",
                    element: (
                        <Songs />
                    ),
                },
                {
                    path: "/songs",
                    element: (
                        <Songs />
                    ),
                },
                {
                    path: "/songs",
                    element: (
                        <Songs />
                    ),
                },
                {
                    path: "/songs",
                    element: (
                        <Songs />
                    ),
                },
                {
                    path: "*",
                    element: <NotFound />,
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
