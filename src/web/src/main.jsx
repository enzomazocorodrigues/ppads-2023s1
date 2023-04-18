import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Alunos from './pages/Alunos';
import Disciplinas from './pages/Disciplinas';
import Navbar from './components/Navbar';
import Turmas from './pages/Turmas';
import Professores from './pages/Professores';
import Index from './pages/Index';

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/alunos", element: <Alunos /> },
  { path: "/turmas", element: <Turmas /> },
  { path: "/disciplinas", element: <Disciplinas /> },
  { path: "/professores", element: <Professores /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <main className='container px-16 py-12'>
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>,
)
