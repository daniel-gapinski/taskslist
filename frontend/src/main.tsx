import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.tsx';
import { TaskProvider } from './contexts/TasksContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <ToastContainer autoClose={5000} theme='colored'  />
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>,
)
