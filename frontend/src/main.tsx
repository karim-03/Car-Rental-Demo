import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css' // My own style file, nothing fancy
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
