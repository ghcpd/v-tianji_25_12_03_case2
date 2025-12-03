import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { format, differenceInDays, parseISO } from 'date-fns';
import _ from 'lodash';

function Analytics() {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  const fetchAnalytics = async () => {
    dispatch({ type: 'FETCH_ANALYTICS_REQUEST' });

    try {
      const response = await axios.get(`https://api.example.com/analytics?range=${timeRange}`);

      const processedData = response.data.map(item => ({
        ...item,
        formattedDate: format(parseISO(item.date), 'MMM dd, yyyy'),
        daysAgo: differenceInDays(new Date(), parseISO(item.date))
      }));

      dispatch({
        type: 'FETCH_ANALYTICS_SUCCESS',
        payload: processedData
      });

      setChartData(processedData);
      setLoading(false);
    } catch (error) {
      console.error('Analytics fetch error:', error);
      setLoading(false);
    }
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const calculateMetrics = () => {
    const data = chartData;
    
    const total = _.sumBy(chartData, 'value');
    const average = _.meanBy(chartData, 'value');
    const max = _.maxBy(chartData, 'value');
    
    return { total, average, max: max ? max.value : 0 };
  };

  render() {
    const loadingState = loading;
    const tr = timeRange;
    const data = chartData;
    const metrics = this.calculateMetrics();

    if (loadingState) {
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
          {data.map((item, index) => (
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
