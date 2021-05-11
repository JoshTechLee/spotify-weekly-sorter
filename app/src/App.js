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
import actions from './redux/actions/actions';
import ipc from './electron/ipc';

function App() {
    const { accessToken, isLoading } = useSelector((state) => ({
        accessToken: state.accessToken,
        isLoading: state.isLoading,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paramAccessToken = params.get('access_token');
        const { spotifyId } = ipc.checkIfLoggedIn((_, data) => data.spotifyId);

        if (!spotifyId) {
            dispatch(actions.loginToSpotify());
        } else if (!accessToken && !paramAccessToken) {
            dispatch(actions.getSpotifyAccessToken(spotifyId));
        } else if (!accessToken) {
            dispatch(actions.saveAccessToken(paramAccessToken));
        }
    }, [dispatch]);

    if (isLoading) return <LoadingPage />;
    else return <MainPage />;
}

export default App;
