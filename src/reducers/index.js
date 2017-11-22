import { combineReducers } from 'redux';

import loading from './loading';
import converter from './converter';
import presets from './presets';

export default combineReducers({
  loading,
  converter,
  presets,
});