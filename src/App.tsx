import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import UserManagement from './pages/UserManagement'
import ProductCatalog from './pages/ProductCatalog'
import OrderTracking from './pages/OrderTracking'
import NavigationBar from './components/NavigationBar'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/orders" element={<OrderTracking />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

