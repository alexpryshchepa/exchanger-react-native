import fullNames from '../api/FullNames';

const initialState = {
  ratesActive: '',
  ratesLocal: {},
  namesAbbr: [],
  namesFull: fullNames,
};

export default function data (state = initialState, action) {
  switch(action.type) {
    case 'FETCH_RATES_SUCCESS':
      return {
        ...state,
        ratesActive: action.ratesActive,
        namesAbbr: action.namesAbbr,
      }
      break
    case 'GET_RATES_SUCCESS':
      return {
        ...state,
        ratesActive: action.ratesActive,
        namesAbbr: action.namesAbbr,
      }
      break
    case 'PUSH_RATES_INTO_LOCAL_STORE_SUCCESS':
      return {
        ...state,
        ratesLocal: {
          ...state.ratesLocal,
          ...action.ratesLocal,
        },
      }
      break
    default:
      return state
  }
}