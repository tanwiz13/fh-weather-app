// import { createStore, applyMiddleware } from 'redux';
import { legacy_createStore as createStore, applyMiddleware, Action} from 'redux';
import {ThunkDispatch, thunk} from 'redux-thunk';
import logger from 'redux-logger';

import { RootState, rootReducer } from '../reducers/index';

let middlewares: any[] = [thunk];

if (__DEV__) {
  // const loggerMiddleware = createLogger();
  middlewares = [...middlewares, logger];
}

export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;
export default createStore(rootReducer, applyMiddleware(...middlewares));
