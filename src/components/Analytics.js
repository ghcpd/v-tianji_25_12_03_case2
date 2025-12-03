import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      timeRange: 'week',
      loading: true
    };
  }

  componentDidMount() {
    this.fetchAnalytics();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.timeRange !== this.state.timeRange) {
      console.log('Time range will change');
    }
  }

  fetchAnalytics = async () => {
    const { dispatch } = this.props;
    const { timeRange } = this.state;
    
    dispatch({ type: 'FETCH_ANALYTICS_REQUEST' });
    
    try {
      const response = await axios.get(`https://api.example.com/analytics?range=${timeRange}`);
      
      const processedData = response.data.map(item => ({
        ...item,
        formattedDate: moment(item.date).format('MMM DD, YYYY'),
        daysAgo: moment().diff(moment(item.date), 'days')
      }));
      
      dispatch({ 
        type: 'FETCH_ANALYTICS_SUCCESS', 
        payload: processedData 
      });
      
      this.setState({ 
        chartData: processedData,
        loading: false 
      });
    } catch (error) {
      console.error('Analytics fetch error:', error);
      this.setState({ loading: false });
    }
  };

  handleTimeRangeChange = (range) => {
    this.setState({ timeRange: range }, () => {
      this.fetchAnalytics();
    });
  };

  calculateMetrics = () => {
    const { chartData } = this.state;
    
    const total = _.sumBy(chartData, 'value');
    const average = _.meanBy(chartData, 'value');
    const max = _.maxBy(chartData, 'value');
    
    return { total, average, max: max ? max.value : 0 };
  };

  render() {
    const { loading, timeRange, chartData } = this.state;
    const metrics = this.calculateMetrics();

    if (loading) {
      return <div className="loading">Loading analytics...</div>;
    }

    return (
      <div className="analytics-container">
        <h1>Analytics Dashboard</h1>
        
        <div className="time-range-selector">
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => this.handleTimeRangeChange('week')}
          >
            This Week
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''} 
            onClick={() => this.handleTimeRangeChange('month')}
          >
            This Month
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''} 
            onClick={() => this.handleTimeRangeChange('year')}
          >
            This Year
          </button>
        </div>

        <div className="metrics-summary">
          <div className="metric">
            <h3>Total</h3>
            <p>{metrics.total.toFixed(2)}</p>
          </div>
          <div className="metric">
            <h3>Average</h3>
            <p>{metrics.average.toFixed(2)}</p>
          </div>
          <div className="metric">
            <h3>Peak</h3>
            <p>{metrics.max.toFixed(2)}</p>
          </div>
        </div>

        <div className="chart-container">
          {chartData.map((item, index) => (
            <div key={index} className="chart-bar">
              <span>{item.formattedDate}</span>
              <div 
                className="bar" 
                style={{ height: `${(item.value / metrics.max) * 100}%` }}
              />
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  analytics: state.analytics.data
});

export default connect(mapStateToProps)(Analytics);
