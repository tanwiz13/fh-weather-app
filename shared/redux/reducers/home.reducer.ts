// import { UnknownAction } from 'redux';
import actionTypes from '../constants/actionTypes';

export interface State {
  city: {};
  locations: any[];
  showLoader: boolean;
  forecast: {};
}

const initialState: State = {
  city: {},
  locations: [],
  showLoader: false,
  forecast: {},
};

export default (
  state = initialState,
  action: any,
): State => {
  switch (action.type) {
    case actionTypes.HOME.DETAILS.SUCCESS:
      return {
        ...state,
        city: action.payload || {},
      };
    case actionTypes.HOME.LOCATIONS.SUCCESS:
      return {
        ...state,
        locations: [...action.payload],
      };
    case actionTypes.HOME.FORECAST.SUCCESS:
      return {
        ...state,
        forecast: action.payload,
      };
    case actionTypes.HOME.LOADER.SHOW:
      return {
        ...state,
        showLoader: true,
      };
    case actionTypes.HOME.LOADER.HIDE:
      return {
        ...state,
        showLoader: false,
      };
    default:
      return state;
  }
};
