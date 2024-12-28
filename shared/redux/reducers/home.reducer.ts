// import { UnknownAction } from 'redux';
import actionTypes from '../constants/actionTypes';

export interface State {
  city: {};
  locations: any[];
}

const initialState: State = {
  city: {},
  locations: [],
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
        locations: [...state.locations, ...action.payload],
      };
    default:
      return state;
  }
};
