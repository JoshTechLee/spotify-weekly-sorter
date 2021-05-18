import React, { useState, useEffect } from 'react';
import LoadingPage from './components/loading_page/LoadingPage';
import MainPage from './components/MainPage';
import { useSelector, useDispatch } from 'react-redux';
import { SPOTIFY_URL } from './resources/constants';
import actions from './redux/actions/initializationActions';
import ipc from './electron/ipcRenderer';

function App() {
    const dispatch = useDispatch();

    const { accessToken, spotifyId, isLoading } = useSelector((state) => {
        console.log(state);

        return {
            accessToken: state.accessToken,
            spotifyId: state.spotifyId,
            isLoading: state.isLoading,
        };
    });

    useEffect(() => {
        fetchFirstAccessToken();
        fetchUserData();
    }, [dispatch]);

    const fetchFirstAccessToken = () => {
        const paramAccessToken = new URLSearchParams(window.location.search).get('access_token');
        const spotifyId = ipc.getId();
        if (!spotifyId && !accessToken && !paramAccessToken) {
            window.location.href = SPOTIFY_URL.LOGIN;
        } else if (!accessToken && !paramAccessToken) {
            dispatch(actions.getAccessToken.request({ spotifyId }));
        } else if (!accessToken) {
            dispatch(actions.saveAccessToken({ accessToken: paramAccessToken }));
        }
    };

    const fetchUserData = () => {
        const spotifyId = ipc.getId();
        if (spotifyId) dispatch(actions.saveUserData({ spotifyId }));
        else dispatch(actions.getUserData.request());
    };

    const testButton = () => {
        console.log('button clicked!');
        dispatch(
            actions.getAccessToken.request({
                spotifyId: 'spotify:user:21qne2mcji3tafrotvafjqrry',
            })
        );
    };

    // if (isLoading) return <LoadingPage />;
    // else return <MainPage />;

    // return <button onClick={testButton}>Test Button</button>;
    return <MainPage />;
}

export default App;
