import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { setNetworkStatus } from '../redux/actions/network';


function useNetworkDetector() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      dispatch(setNetworkStatus(state.isConnected ?? false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
}

export default useNetworkDetector;
