const initialState = {
  visibility: false,
  type: '',
  preset: false,
};

export default function currencyList (state = initialState, action) {
  switch(action.type) {
    case 'CURRENCY_LIST_VISIBILITY_CHANGED':
      return {
        ...state,
        visibility: action.visibility,
        type: action.listType,
        preset: action.preset,
      }
      break
    default:
      return state
  }
}