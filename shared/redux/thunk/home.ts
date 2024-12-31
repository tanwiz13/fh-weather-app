import { Action, Dispatch, UnknownAction } from 'redux';
import NetworkService from '../../api/util';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { fetchCurrentWeatherSuccess, fetchForecastSuccess, fetchLocationSuccess, hideLoader, showLoader } from '../actions/home';

export const fetchCurrentWeather = (city: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
      dispatch(showLoader());
      const response = await NetworkService.get<any[]>(`current.json?key=1c7f606a5e3540eb8dd191642242712&q=${city}`);
      console.log('>>>>>>>city', response);
      dispatch(fetchCurrentWeatherSuccess(response));
      dispatch(hideLoader());
    } catch (error) {
      console.log('>>>>>>>>>>;>>>>>> error', error);
      dispatch({ type: 'CITY_DETAILS_ERROR', error });
    }
    finally {
      dispatch(hideLoader());
    }
  };
};

export const fetchLocations = (searchString: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
      // dispatch(showLoader());
      const response = await NetworkService.get<any[]>(`search.json?key=1c7f606a5e3540eb8dd191642242712&q=${searchString}`);
      console.log('>>>>>>>search locations', response);
      dispatch(fetchLocationSuccess(response));
    } catch (error) {
      console.log('>>>>>>>>>>;>>>>>> error', error);
      dispatch({ type: 'LOCATIONS_ERROR', error });
    }
    finally {
      dispatch(hideLoader());
    }
  };
};

export const fetchForecast = (city: string, days: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
      const response = await NetworkService.get<any[]>(`forecast.json?key=1c7f606a5e3540eb8dd191642242712&days=${days}&q=${city}`);
      dispatch(fetchForecastSuccess(response));
    } catch (error) {
      dispatch({ type: 'FORECAST_ERROR', error });
    }
    finally {
      dispatch(hideLoader());
    }
  };
};
