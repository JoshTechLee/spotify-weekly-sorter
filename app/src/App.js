import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';

import { SERVER_URL } from './resources/constants';
import { getAccessToken, getUserData } from './redux/actions/initializationActions';
import { getUserPlaylists } from './redux/actions/playlistActions';
import ipc from './electron/ipcRenderer';
import MainPage from './components/MainPage';

function App() {
    const dispatch = useDispatch();

    const { accessToken, userData } = useSelector((state) => ({
        accessToken: state.userData.accessToken,
        userData: state.userData,
    }));

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
            window.location.href = SERVER_URL.LOGIN;
        if (userData.spotifyId) dispatch(getUserData.success({ userData }));
        if (!accessToken && userData.spotfyId) {
            dispatch(getAccessToken.request({ spotifyId: userData.spotifyId }));
        } else if (!accessToken && paramAccessToken) {
            console.log('posting params');
            dispatch(getAccessToken.success({ accessToken: paramAccessToken }));
        }
    };

    // const fetchPlaylists = () => {
    //     dispatch(actions.)
    // }

    const testButton = () => {
        console.log('reaching here');
        dispatch(getUserPlaylists.request({ accessToken: 'bleh' }));

        // const newAccessToken =
        //     'BQAEfcMMQD2SLp4zRqYXz_qhOur27Y2ltDNq_v938ck17hKsG9H7vH82P4baLbV6JDBAIcem7Agl9fIybd9u9HoObH47gCqYmG_2aqNLX1Yayb1zUzF0r9irqfh55FiLn9QF0KnqVa9IQDuNa2c-6RQtt_27sWSR4GcH-JddXiuguoUqtf9ffGxp9cwH6fP1MRTCE8QEIU0Dw7UZhFwhEabo66ZLimYFsIcHPkPjKt8RHC9ci1_fxTPlBpQM1y1NKym_KCwC0rQVG-wf_cWwhF9QGB5Nzs1DwYdNgvHBNWLHzds';
        // console.log('Bearer ' + newAccessToken);
        // axios
        //     .get('https://api.spotify.com/v1/me/playlists', {
        //         params: { limit: 50, offset: 0 },
        //         headers: {
        //             Accept: 'application/json',
        //             Authorization: 'Bearer ' + newAccessToken,
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //     .then((data) => console.log(data))
        //     .catch((err) => {
        //         if (err.response) {
        //             const { message, status } = {
        //                 message: err.response.data.error.message,
        //                 status: err.response.data.error.status,
        //             };
        //         }
        //     });
    };

    // return <MainPage />;

    return <button onClick={testButton}>testing</button>;
}

export default App;
