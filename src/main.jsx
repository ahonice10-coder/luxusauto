import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { VehicleProvider } from './context/VehicleContext'
import { AuthProvider } from './context/AuthContext'
import { ReservationProvider } from './context/ReservationContext'
import { NotificationProvider } from './context/NotificationContext'
import { LanguageProvider } from './i18n/LanguageContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <VehicleProvider>
            <ReservationProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </ReservationProvider>
          </VehicleProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
