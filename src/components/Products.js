import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

function Products() {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [sortBy] = useState('name');

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Products updated');
  }, [products]);

  const loadProducts = async () => {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

    try {
      const response = await axios.get('https://api.example.com/products');
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredProducts = useMemo(() => {
    const f = filter.toLowerCase();
    let result = _.filter(products, (product) =>
      _.includes(product.name.toLowerCase(), f)
    );
    return _.sortBy(result, [sortBy]);
  }, [products, filter, sortBy]);

  return (
    <div className="products-container">
      <h1>Products Management</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={filter}
          onChange={handleFilterChange}
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

export default Products;
