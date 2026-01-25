import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function Navigation() {
  const currentTime = format(new Date(), 'HH:mm:ss');

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>E-Commerce Dashboard</h2>
        <span className="current-time">{currentTime}</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
