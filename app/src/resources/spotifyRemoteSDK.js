import ipc from '../electron/ipc/ipcRenderer';

const loadSpotifyScript = (callback) => {
    const existingScript = document.getElementById('spotify');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.id = 'spotify';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    }
    if (existingScript && callback) callback();
};

export const activateSpotifySDK = ({
    accessToken,
    initializationErrorAction,
    authenticationErrorAction,
    accountErrorAction,
    playbackErrorAction,
    getDeviceIdAction,
    getPlayerAction,
}) => {
    loadSpotifyScript(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const spotifyPlayer = new window.Spotify.Player({
                name: 'React Spotify Player',
                getOAuthToken: (callback) => {
                    callback(accessToken);
                },
                volume: 1,
            });
            spotifyPlayer.addListener('initialization_error', ({ message }) => {
                console.log(message);
                if (initializationErrorAction) initializationErrorAction();
            });
            spotifyPlayer.addListener('authentication_error', ({ message }) => {
                console.log(message);
                if (authenticationErrorAction) authenticationErrorAction();
            });
            spotifyPlayer.addListener('account_error', ({ message }) => {
                console.error(message);
                if (accountErrorAction) accountErrorAction();
            });
            spotifyPlayer.addListener('playback_error', ({ message }) => {
                console.error(message);
                if (playbackErrorAction) playbackErrorAction();
            });
            // spotifyPlayer.addListener('ready', ({ device_id }) => {
            //     console.log('Connected with Device ID', device_id);
            //     getDeviceIdAction({ device_id });
            // });
            // spotifyPlayer.connect().then((success) => {
            //     if (success) {
            //         console.log('spotify connection successful');
            //         getPlayerAction({ spotifyPlayer });
            //     }
            // });
        };
    });
};

export const deactivateSpotifySDK = ({ spotifyPlayer }) => {
    spotifyPlayer.disconnect();
};
