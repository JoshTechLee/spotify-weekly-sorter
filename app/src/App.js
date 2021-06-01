import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import { SERVER_URL } from './resources/constants';
import { getAccessToken, getUserData } from './redux/actions/initializationActions';
import { setPlaylistSearch } from './redux/actions/playlistActions';
import { activateSpotifySDK } from './resources/spotifyRemoteSDK';
import ipc from './electron/ipc/ipcRenderer';

import MainPage from './components/MainPage';

function App() {
    const dispatch = useDispatch();
    const { accessToken, userData } = useSelector((state) => ({
        accessToken: state.accessToken.code,
        userData: state.userData,
    }));

    const [player, setPlayer] = useState();

    useEffect(() => {
        if (!accessToken || !userData.spotifyId) initializeApp();
        if (accessToken) {
            activateSpotifySDK({
                accessToken,
                // initializationErrorAction
                // authenticationErrorAction: () => dispatch(getAccessToken.request({ spotifyId: userData.spotifyId })
                // accountErrorAction,
                // playbackErrorAction,
                // getDeviceIdAction,
                // getPlayerAction,
            });
        }
    }, [dispatch]);

    setInterval(() => {
        console.log('still running');
    }, 1000);

    const initializeApp = () => {
        const params = queryString.parse(window.location.search);
        const paramAccessToken = params.access_token;
        let userData = {
            displayName: params.display_name,
            spotifyId: params.id,
            image: params.image,
            isPremium: params.is_premium === 'true',
        };
        // If user data not provided in URL, get user data from local save file.  If user
        // data not available, initiate redirect + spotify login.  Get access token after.
        if (!userData.spotifyId) userData = ipc.getUserData();
        if (!userData.spotifyId && !accessToken && !paramAccessToken)
            window.location.href = SERVER_URL.LOGIN;
        if (userData.spotifyId) dispatch(getUserData.success({ userData }));
        if (!accessToken && userData.spotfyId) {
            dispatch(getAccessToken.request({ spotifyId: userData.spotifyId }));
        } else if (!accessToken && paramAccessToken) {
            dispatch(getAccessToken.success({ accessToken: paramAccessToken }));
        }
    };

    const testButton1 = () => {
        dispatch(setPlaylistSearch.filter());
        // dispatch(getAccessToken.request({ spotifyId: userData.spotifyId }));
    };

    const testButton2 = () => {
        console.log(player);
        player.getCurrentState().then((state) => {
            console.log(state);
        });
        // dispatch({ type: 'RESET' });
    };

    return <MainPage />;

    return (
        <div>
            <button onClick={testButton1}>testing</button>
            <button onClick={testButton2}>PURGE THIS</button>
        </div>
    );
}

export default App;
