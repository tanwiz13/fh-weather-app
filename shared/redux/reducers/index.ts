import { combineReducers } from 'redux';
import home, {State as HomeState} from './home.reducer';
import networkReducer, {State as NetworkState} from './network.reducer';

export interface RootState {
  home: HomeState;
  network: NetworkState;
}

export const rootReducer = combineReducers({ home: home, network: networkReducer});
