import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import { SERVER_URL } from './resources/constants';
import { getAccessToken, getUserData } from './redux/actions/initializationActions';
import { setPlaylistSearch } from './redux/actions/playlistActions';
import { loadSpotifyScript } from './resources/scripts';
import ipc from './electron/ipcRenderer';

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
        if (accessToken) initializeSpotifySDK();
    }, [dispatch]);

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

    const initializeSpotifySDK = () => {
        loadSpotifyScript(() => {
            window.onSpotifyWebPlaybackSDKReady = () => {
                console.log("IT'S WORKING!!");
                const player = new window.Spotify.Player({
                    name: 'React Spotify Player',
                    getOAuthToken: (cb) => {
                        cb(
                            'BQDmNHItpcSkFTuhbCaAf_fGQUHbxD6HfIhraBCpG29OkpwA-v3YbZv10VVDuYg6VdIWbjBmlxTXS9yHvjRr4IH5oqAVwLrhsaDy4AnIhk-pUloNfMyZSvsll-27ggxwKE4opupjyAQ6DZKXgYeSyNX8CsnF0AGYfbgDw4szJEdVVfphJGgkcRnmteBvYeInodeH8tt-PNA_t3rteg'
                        );
                    },
                    volume: 1,
                });
                player.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                });
                player.addListener('authentication_error', ({ message }) => {
                    console.log('uhOh sdfsdfsdf');
                    console.error(message);
                    dispatch(getAccessToken.request({ spotifyId: userData.spotifyId }));
                });
                player.addListener('account_error', ({ message }) => {
                    console.error(message);
                });
                player.addListener('playback_error', ({ message }) => {
                    console.error(message);
                });

                player.addListener('ready', ({ device_id }) => {
                    console.log('Connected with Device ID', device_id);
                });
                player.connect().then((success) => {
                    if (success) {
                        console.log('player connected');
                        console.log(player);

                        setPlayer(player);
                    }
                });
            };
        });
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

    // return <MainPage />;

    return (
        <div>
            <button onClick={testButton1}>testing</button>
            <button onClick={testButton2}>PURGE THIS</button>
        </div>
    );
}

export default App;
