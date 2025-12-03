const initialState = {
  username: null,
  email: null,
  role: 'guest',
  isAuthenticated: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
