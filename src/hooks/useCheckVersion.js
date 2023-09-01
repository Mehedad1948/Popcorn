import { useEffect, useState } from 'react';
import { getVersion as getVersionApi } from '../services/authenticationApi';
import { toast } from 'react-hot-toast';


export function useCheckVersion(params) {
    const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);
    const [currentVersionState, setCurrentVersionState] = useState(0);
  
    useEffect(() => {
      async function getVersion(params) {
        const { version } = await getVersionApi();
  
        const currentVersion = process.env.REACT_APP_VERSION;
        setCurrentVersionState(currentVersion);
  
        if (version && version > Number(currentVersion)) {
          setIsNewVersionAvailable(true);
  
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification('App Update', {
                body: 'An update is available. Please refresh to use the latest version.',
              });
            }
          });

          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
              console.log('event', event);
              if (event.data && event.data.type === 'UPDATE_FINISHED') {
                // Update your UI to inform the user that the update has finished.
                // toast.success('🎉 App was successfully updated')
              }
            });
          }
        } else {
          setIsNewVersionAvailable(false);
        }
      }
      getVersion();
    }, []);

    return {isNewVersionAvailable, currentVersionState}
}