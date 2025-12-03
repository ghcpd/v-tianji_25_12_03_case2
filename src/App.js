import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Analytics from './components/Analytics';
import Navigation from './components/Navigation';

// Using class component with legacy lifecycle methods
class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    location: PropTypes.object.isRequired
  };

  UNSAFE_componentWillMount() {
    console.log('Component will mount');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      console.log('Route changed');
    }
  }

  render() {
    return (
      <div className="app-container">
        <Navigation />
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/products" component={Products} />
            <Route path="/analytics" component={Analytics} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(App));
