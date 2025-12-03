import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Analytics from './components/Analytics';
import Navigation from './components/Navigation';

// Using class component with legacy lifecycle methods
function App() {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    // componentDidMount equivalent
    console.log('App mounted');
  }, []);

  useEffect(() => {
    // run on location changes
    console.log('Route changed', location.pathname);
  }, [location]);

  return (
    <div className="app-container">
      <Navigation />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
}

App.propTypes = {
  // keep prop-types as documentation for backward compatibility
  user: PropTypes.object,
};

export default App;
