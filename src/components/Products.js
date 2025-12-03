import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';

class Products extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      sortBy: 'name'
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.products !== this.props.products) {
      console.log('Products updated');
    }
  }

  loadProducts = async () => {
    const { dispatch } = this.props;
    
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    
    try {
      const response = await axios.get('https://api.example.com/products');
      dispatch({ 
        type: 'FETCH_PRODUCTS_SUCCESS', 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_PRODUCTS_FAILURE', 
        payload: error.message 
      });
    }
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredProducts = () => {
    const { products } = this.props;
    const { filter, sortBy } = this.state;
    
    let filtered = _.filter(products, (product) => 
      _.includes(product.name.toLowerCase(), filter.toLowerCase())
    );
    
    return _.sortBy(filtered, [sortBy]);
  };

  render() {
    const { filter } = this.state;
    const filteredProducts = this.getFilteredProducts();

    return (
      <div className="products-container">
        <h1>Products Management</h1>
        
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={filter}
            onChange={this.handleFilterChange}
          />
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">${product.price}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items
});

export default connect(mapStateToProps)(Products);
