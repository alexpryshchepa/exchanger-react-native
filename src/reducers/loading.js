const initialState = {
  loading: true,
  refresh: false,
};

export default function loading (state = initialState, action) {
  switch(action.type) {
    case 'APP_LOADING_SUCCESS':
      return {
        ...state,
        loading: action.loading,
      }
      break
    case 'APP_LOADING_FAIL':
      return {
        ...state,
        loading: action.loading,
        refresh: action.refresh,
      }
      break
    case 'APP_REFRESHING':
      return {
        ...state,
        loading: action.loading,
        refresh: action.refresh,
      }
      break
    default:
      return state
  }
}