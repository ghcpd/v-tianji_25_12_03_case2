const initialState = {
  data: [],
  dateRange: {
    start: null,
    end: null
  },
  loading: false
};

export default function analyticsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ANALYTICS_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_ANALYTICS_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case 'SET_DATE_RANGE':
      return {
        ...state,
        dateRange: action.payload
      };
    default:
      return state;
  }
}
