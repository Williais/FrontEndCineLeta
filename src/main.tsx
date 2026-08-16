/// <reference types="vite-plugin-pwa/client" />
import 'virtual:pwa-register';
import { StrictMode } from 'react'
// ... resto dos imports
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
