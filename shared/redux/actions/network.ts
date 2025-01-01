export const SET_NETWORK_STATUS = 'SET_NETWORK_STATUS';

export const setNetworkStatus = (isConnected: boolean) => ({
  type: SET_NETWORK_STATUS,
  payload: isConnected,
});
