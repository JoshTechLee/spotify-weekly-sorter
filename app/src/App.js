import './App.css';
import SearchBox from './components/search_box/SearchBox';
import { useState, useEffect } from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect,
//     useHistory,
//     useLocation,
// } from 'react-router-dom';
import LoadingPage from './components/loading_page/loading_page';
import { useSelector, useDispatch } from 'react-redux';
const { ipcRenderer } = window.require('electron');

function App() {
    const { isLoading } = useSelector((state) => ({ isLoading: state.nxd0 }));

    const dispatch = useDispatch();

    useEffect(() => {
        ipcRenderer.on('VERIFY_SPOTIFY_LOGIN', (event, data) => {
            if (!data) {
                dispatch({ type: 'UPDATE_USERNAME', payload: data.username });
            }
        });
    }, [dispatch]);

    return <MainPage />;
}

export default App;

// const SpotifyLoginRoute = () => {
//     return <Route />;
// };

const MainPage = () => {
    const talkToElectron = () => {
        ipcRenderer.send('CHECK_IF_LOGGED_IN', 'what what');
    };

    return (
        <div className="App grid-container">
            <div className="playlists-header">
                <SearchBox />
            </div>
            <div className="songs-header">I am song header</div>
            <div className="playlists-body">I am playlist body</div>
            <div className="progress-bar">
                <a href={process.env.REACT_APP_SERVER_ADDRESS + '/spotify/login'}>Login</a>
            </div>
            <div className="songs-body">
                <button onClick={talkToElectron}>NOOT NOOT</button>
            </div>
        </div>
    );
};
