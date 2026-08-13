import { AppRoutes } from './routes/AppRoutes'
import { Navbar } from './components/navigation/Navbar'
import { BottomNavbar } from './components/navigation/BottomNavbar'
import { Footer } from './components/navigation/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <main className="pt-16 pb-24 md:pb-0">
        <AppRoutes />
      </main>
      <Footer />
      <BottomNavbar />
    </div>
  )
}

export default App
