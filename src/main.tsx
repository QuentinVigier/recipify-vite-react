import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import CategoryPage from './pages/CategoryPage.tsx';
import Search from './pages/Search.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "categories/:category",
    element: <CategoryPage />,
  },
  {
    path: "/recettes",
    element: <div>Skills</div>,
  },
  {
    path: "/recette/:id",
    element: <div>Contact</div>,
  },
  {
    path: "/search",
    element: <Search />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)