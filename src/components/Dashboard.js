import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {},
      loading: true
    };
  }

  UNSAFE_componentWillMount() {
    this.fetchDashboardData();
  }

  fetchDashboardData = async () => {
    try {
      const response = await axios.get('https://api.example.com/dashboard/stats');
      
      const formattedDate = moment().format('MMMM Do YYYY, h:mm:ss a');
      
      this.setState({
        stats: response.data,
        loading: false,
        lastUpdated: formattedDate
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      this.setState({ loading: false });
    }
  };

  handleSearch = _.debounce((value) => {
    console.log('Searching for:', value);
  }, 300);

  render() {
    const { loading, stats } = this.state;
    
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
            <p>{this.state.lastUpdated}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
