import React, { useState, useEffect } from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect,
//     useHistory,
//     useLocation,
// } from 'react-router-dom';
import LoadingPage from './components/loading_page/LoadingPage';
import MainPage from './components/MainPage';
import { useSelector, useDispatch } from 'react-redux';
import { SPOTIFY_URL } from './resources/constants';
import actions from './redux/actions/actions';
import ipc from './electron/ipc';

function App() {
    const dispatch = useDispatch();

    const { accessToken, isLoading } = useSelector((state) => ({
        accessToken: state.accessToken,
        isLoading: state.isLoading,
    }));

    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const paramAccessToken = params.get('access_token');
    //     let spotifyId;
    //     ipc.getSpotifyId((_, data) => (spotifyId = data.spotifyId));

    //     if (!spotifyId) {
    //         window.location.href = SPOTIFY_URL.REDIRECT;
    //     } else if (!accessToken && !paramAccessToken) {
    //         dispatch(actions.getSpotifyAccessToken.request({ spotifyId }));
    //     } else if (!accessToken) {
    //         dispatch(actions.saveSpotifyAccessToken({ accessToken: paramAccessToken }));
    //     }
    // }, [dispatch]);

    const testButton = () => {
        console.log('button clicked!');
        dispatch(
            actions.getSpotifyAccessToken.request({
                spotifyId: 'spotify:user:21qne2mcji3tafrotvafjqrry',
            })
        );
    };

    // if (isLoading) return <LoadingPage />;
    // else return <MainPage />;

    return <button onClick={testButton}>Test Button</button>;
    return <MainPage />;
}

export default App;
