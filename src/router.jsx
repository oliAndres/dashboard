import { createBrowserRouter } from "react-router-dom";
import { ListMovies } from "./pages/list-movies";
import { Home } from "./pages/home";
import { Layout } from "./layouts";

export const router =  createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children : [
            {
                index : true,
                element : <Home/>
            },
            {
            path: '/movies',
            element: <ListMovies/>
            }
        ]
    }
])