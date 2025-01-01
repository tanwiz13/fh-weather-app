import { Action } from 'redux';
import Toast from 'react-native-simple-toast';
import NetworkService, { beautifyUrl } from '../../api/util';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { fetchCurrentWeatherSuccess, fetchForecastSuccess, fetchLocationSuccess, hideLoader, showLoader } from '../actions/home';
import { Config } from '../../api/constants';

export const fetchCurrentWeather = (city: string): ThunkAction<void, RootState, any, Action<string>> => {
  return async (dispatch: ThunkDispatch<RootState, any, Action<string>>) => {
    try {
      dispatch(showLoader());
      const response = await NetworkService.get<any[]>(beautifyUrl(Config.api.getCurrentWeather, [Config.api.key, city]));
      dispatch(fetchCurrentWeatherSuccess(response));
      dispatch(fetchForecast(city, '1'));
      dispatch(hideLoader());
    } catch (error) {
      dispatch({ type: 'CITY_DETAILS_ERROR', error });
      Toast.show('Error fetching weather details.', Toast.SHORT);
    }
    finally {
      dispatch(hideLoader());
    }
  };
};

export const fetchLocations = (searchString: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: ThunkDispatch<RootState, any, Action<string>>) => {
    try {
      // dispatch(showLoader());
      const response = await NetworkService.get<any[]>(beautifyUrl(Config.api.searchLocation, [Config.api.key, searchString]));
      dispatch(fetchLocationSuccess(response));
    } catch (error) {
      dispatch({ type: 'LOCATIONS_ERROR', error });
      Toast.show('Error fetching locations.', Toast.SHORT);
    }
    finally {
      dispatch(hideLoader());
    }
  };
};

export const fetchForecast = (city: string, days: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch: ThunkDispatch<RootState, any, Action<string>>) => {
    try {
      const response = await NetworkService.get<any>(beautifyUrl(Config.api.getForecast, [Config.api.key, days, city]));
      dispatch(fetchForecastSuccess(response?.forecast?.forecastday));
    } catch (error) {
      dispatch({ type: 'FORECAST_ERROR', error });
      Toast.show('Error fetching forecast.', Toast.SHORT);
    }
    finally {
      dispatch(hideLoader());
    }
  };
};
