import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { loadSystemScene } from './features/hero/load-system-scene'

if (!navigator.connection?.saveData) void loadSystemScene().catch(() => {})

const container = document.getElementById('root')
const application = <StrictMode><App /></StrictMode>
if (container.hasChildNodes()) hydrateRoot(container, application)
else createRoot(container).render(application)
