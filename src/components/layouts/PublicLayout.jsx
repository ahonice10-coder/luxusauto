import { Outlet } from 'react-router-dom'
import { Navbar } from '../navigation/Navbar'
import { BottomNavbar } from '../navigation/BottomNavbar'
import { Footer } from '../navigation/Footer'
import { PageTransition } from '../PageTransition'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="main-content" className="pb-28 md:pb-0">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <BottomNavbar />
    </div>
  )
}
