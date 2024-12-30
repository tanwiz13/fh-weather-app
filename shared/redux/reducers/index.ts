import { combineReducers } from 'redux';
import home, {State as HomeState} from './home.reducer';

export interface RootState {
  home: HomeState;
}

export const rootReducer = combineReducers({ home: home });
