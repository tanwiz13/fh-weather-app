import { SET_NETWORK_STATUS } from '../actions/network';

export interface State {
  isConnected: boolean;
}

const initialState: State = {
  isConnected: true,
};

export default (
  state = initialState,
  action: any,
): State =>{
  switch (action.type) {
    case SET_NETWORK_STATUS:
      return { ...state, isConnected: action.payload };
    default:
      return state;
  }
};
