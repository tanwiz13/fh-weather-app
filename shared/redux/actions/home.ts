import actionTypes from '../constants/actionTypes';

export const showLoader = () => ({
  type: actionTypes.HOME.LOADER.SHOW,
});

export const hideLoader = () => ({
  type: actionTypes.HOME.LOADER.HIDE,
});

export const fetchCurrentWeatherSuccess = (data: any[]) => ({
  payload: data,
  type: actionTypes.HOME.DETAILS.SUCCESS,
});

export const fetchLocationSuccess = (data: any[]) => ({
  payload: data,
  type: actionTypes.HOME.LOCATIONS.SUCCESS,
});
