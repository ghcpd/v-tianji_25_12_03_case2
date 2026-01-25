import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import classNames from 'classnames';

function Dashboard(props) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('https://api.example.com/dashboard/stats');
      
      const formattedDate = new Date();

      setStats(response.data);
      setLoading(false);
      setLastUpdated(formattedDate);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSearch = useCallback(
    _.debounce((value) => {
      console.log('Searching for:', value);
    }, 300),
    []
  );

  // render
    // keep compatibility with previous structure
    // lastUpdated is a Date instance saved in state
    // formatted display will happen inside render
    // eslint-disable-next-line no-unused-vars
    // keep stats/loading from hooks
    
    const containerClass = classNames({
      'dashboard-container': true,
      'loading': loading,
      'loaded': !loading
    });

    return (
      <div className={containerClass}>
        <h1>Dashboard Overview</h1>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p>${stats.totalSales || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p>{stats.activeUsers || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>${stats.revenue || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Last Updated</h3>
              <p>{lastUpdated ? lastUpdated.toString() : ''}</p>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
