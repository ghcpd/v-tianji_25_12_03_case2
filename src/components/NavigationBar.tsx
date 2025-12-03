import { Link, useLocation } from 'react-router-dom'
import './NavigationBar.css'

const NavigationBar = () => {
  const location = useLocation()

  return (
    <nav className="nav-bar">
      <div className="nav-brand">TestApp</div>
      <ul className="nav-links">
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active-link' : 'nav-link'}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/users" 
            className={location.pathname === '/users' ? 'active-link' : 'nav-link'}
          >
            Users
          </Link>
        </li>
        <li>
          <Link 
            to="/products" 
            className={location.pathname === '/products' ? 'active-link' : 'nav-link'}
          >
            Products
          </Link>
        </li>
        <li>
          <Link 
            to="/orders" 
            className={location.pathname === '/orders' ? 'active-link' : 'nav-link'}
          >
            Orders
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar

