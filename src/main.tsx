import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './routes/home/Home.jsx'
import Search from './routes/search/Search.jsx'
import Sort from './routes/sort/Sort.jsx'
import ErrorPage from './ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
    errorElement: <ErrorPage />
  },
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "sort",
    element: <Sort />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
