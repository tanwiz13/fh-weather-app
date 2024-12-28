import { Action, Dispatch, UnknownAction } from 'redux';
import NetworkService from '../../api/util';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';

export const fetchCurrentWeather = (city: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
      const response = await NetworkService.get<any[]>(`current.json?key=1c7f606a5e3540eb8dd191642242712&q=${city}`);
      console.log('>>>>>>>city', response);
      dispatch({ type: 'CITY_DETAILS_SUCCESS', payload: response });
    } catch (error) {
      console.log('>>>>>>>>>>;>>>>>> error', error);
      dispatch({ type: 'CITY_DETAILS_ERROR', error });
    }
  };
};

export const fetchLocations = (searchString: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
      const response = await NetworkService.get<any[]>(`search.json?key=1c7f606a5e3540eb8dd191642242712&q=${searchString}`);
      console.log('>>>>>>>search locations', response);
      dispatch({ type: 'LOCATIONS_SUCCESS', payload: response });
    } catch (error) {
      console.log('>>>>>>>>>>;>>>>>> error', error);
      dispatch({ type: 'LOCATIONS_ERROR', error });
    }
  };
};
