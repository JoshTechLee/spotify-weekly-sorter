import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import { SPOTIFY_URL } from './resources/constants';
import actions from './redux/actions/initializationActions';
import ipc from './electron/ipcRenderer';
import MainPage from './components/MainPage';

function App() {
    const dispatch = useDispatch();

    const { accessToken, userData } = useSelector((state) => ({
        accessToken: state.userData.accessToken,
        userData: state.userData,
    }));

    useEffect(() => {
        if (!accessToken || !userData.spotifyId) fetchFirstAccessToken();
    }, [dispatch]);

    const fetchFirstAccessToken = () => {
        const params = queryString.parse(window.location.search);
        const paramAccessToken = params.access_token;
        let userData = {
            displayName: params.display_name,
            spotifyId: params.id,
            image: params.image,
            isPremium: params.is_premium == 'true',
        };
        console.log('this ran this many times');
        // If user data not provided in URL, get user data from local save file.  If user
        // data not available, initiate redirect + spotify login.  Get access token after.
        if (!userData.spotifyId) userData = ipc.getUserData();
        if (!userData.spotifyId && !accessToken && !paramAccessToken)
            window.location.href = SPOTIFY_URL.LOGIN;
        if (userData.spotifyId) dispatch(actions.getUserData.success({ userData }));
        else if (!accessToken && userData.spotfyId) {
            dispatch(actions.getAccessToken.request({ spotifyId: userData.spotifyId }));
        } else if (!accessToken && paramAccessToken) {
            dispatch(actions.getAccessToken.success({ accessToken: paramAccessToken }));
        }
    };

    // const fetchPlaylists = () => {
    //     dispatch(actions.)
    // }

    const testButton = () => {
        dispatch(
            actions.getAccessToken.request({ spotifyId: 'spotify:user:21qne2mcji3tafrotvafjqrry' })
        );
    };

    return <MainPage />;

    // return <button onClick={testButton}>testing</button>;
}

export default App;
