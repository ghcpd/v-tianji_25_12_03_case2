const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PRODUCTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SELECT_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload
      };
    default:
      return state;
  }
}
