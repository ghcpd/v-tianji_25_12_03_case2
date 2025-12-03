import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Analytics from './components/Analytics';
import Navigation from './components/Navigation';

function App() {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    // runs on mount
    console.log('App mounted');
  }, []);

  useEffect(() => {
    // respond to route changes
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
  user: PropTypes.object
};

export default App;
