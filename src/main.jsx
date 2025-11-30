import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SettingsProvider } from './contexts/SettingsContext.jsx'
import { store } from './store/store'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <SettingsProvider>
      <App />
      </SettingsProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
