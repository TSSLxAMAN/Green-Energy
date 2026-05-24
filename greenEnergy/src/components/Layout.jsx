import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  const location = useLocation()
  const hideHeaderFooter =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideHeaderFooter && <Navbar />}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}

export default Layout
