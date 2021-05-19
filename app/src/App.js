import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';

import { SPOTIFY_URL } from './resources/constants';
import actions from './redux/actions/initializationActions';
import ipc from './electron/ipcRenderer';
import MainPage from './components/MainPage';

function App() {
    const dispatch = useDispatch();

    const { accessToken, userData } = useSelector((state) => {
        const temp = {
            accessToken: state.userData.accessToken,
            userData: state.userData,
        };
        console.log(temp);
        return temp;
    });

    useEffect(() => {
        console.log('we got here');
        if (!accessToken || !userData.spotifyId) initializeApp();
    }, [dispatch]);

    const initializeApp = () => {
        console.log('initializing app');
        const params = queryString.parse(window.location.search);
        const paramAccessToken = params.access_token;
        let userData = {
            displayName: params.display_name,
            spotifyId: params.id,
            image: params.image,
            isPremium: params.is_premium == 'true',
        };
        // If user data not provided in URL, get user data from local save file.  If user
        // data not available, initiate redirect + spotify login.  Get access token after.
        if (!userData.spotifyId) userData = ipc.getUserData();
        if (!userData.spotifyId && !accessToken && !paramAccessToken)
            window.location.href = SPOTIFY_URL.LOGIN;
        if (userData.spotifyId) dispatch(actions.getFirstUserData.success({ userData }));
        if (!accessToken && userData.spotfyId) {
            dispatch(actions.getFirstAccessToken.request({ spotifyId: userData.spotifyId }));
        } else if (!accessToken && paramAccessToken) {
            console.log('posting params');
            dispatch(actions.getFirstAccessToken.success({ accessToken: paramAccessToken }));
        }
    };

    // const fetchPlaylists = () => {
    //     dispatch(actions.)
    // }

    const testButton = () => {
        // console.log(accessToken);
        // axios
        //     .get(
        //         'https://api.spotify.com/v1/me/playlists',
        //         { params: { limit: 50, offset: 0 } },
        //         {
        //             headers: {
        //                 Accept: 'application/json',
        //                 Authorization: 'Bearer ' + accessToken,
        //                 'Content-Type': 'application/json',
        //             },
        //         }
        //     )
        //     .then((data) => console.log(data))
        //     .catch((err) => console.log(err));
    };

    // return <MainPage />;

    return <button onClick={testButton}>testing</button>;
}

export default App;
