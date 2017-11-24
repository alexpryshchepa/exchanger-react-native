const initialState = {
  list: [
    {
      currencyFrom: 'EUR',
      currencyTo: 'GBP',
    },
    {
      currencyFrom: 'CNY',
      currencyTo: 'CHF',
    },
  ],
};

export default function presets (state = initialState, action) {
  switch(action.type) {
    case 'PRESET_CURRENCY_CHANGED':
      return {
        ...state,
        list: action.presets,
      }
      break
    default:
      return state
  }
}