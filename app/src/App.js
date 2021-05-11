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
        if (!accessToken && !paramAccessToken) {
            ipc.checkIfLoggedIn((_, data) => {
                if (data.spotifyId) {
                    dispatch({ type: 'GET_ACCESS_TOKEN', payload: data.spotifyId });
                } else {
                    dispatch({ type: 'LOGIN_TO_SPOTIFY' });
                }
            });
        } else if (!accessToken) {
            dispatch({ type: 'SAVE_ACCESS_TOKEN', payload: paramAccessToken });
        }
    }, [dispatch]);

    if (isLoading) return <LoadingPage />;
    else return <MainPage />;
}

export default App;
