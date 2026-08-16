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
import { FavoritesProvider } from './context/FavoritesContext'
import { ToastProvider } from './context/ToastContext'
import { TooltipProvider } from '@/components/ui/tooltip'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <TooltipProvider>
          <ToastProvider>
            <AuthProvider>
              <VehicleProvider>
                <FavoritesProvider>
                  <ReservationProvider>
                    <NotificationProvider>
                      <App />
                    </NotificationProvider>
                  </ReservationProvider>
                </FavoritesProvider>
              </VehicleProvider>
            </AuthProvider>
          </ToastProvider>
        </TooltipProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
