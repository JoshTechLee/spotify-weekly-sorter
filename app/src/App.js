import './App.css';
import SearchBox from './components/search_box/SearchBox';
import { spotifyAuthorization } from './resources/requests';
import { codeVerifier } from './resources/helper';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

function App() {
    const spotifyAuth = () => {
        const code = codeVerifier();
        spotifyAuthorization({ code }).then((res) => console.log(res));
    };

    return <MainPage />;
}

export default App;

const SpotifyLoginRoute = () => {
    return <Route />;
};

const MainPage = () => {
    return (
        <div className="App grid-container">
            <div className="playlists-header">
                <SearchBox />
            </div>
            <div className="songs-header">I am song header</div>
            <div className="playlists-body">I am playlist body</div>
            <div className="progress-bar">
                <a href={process.env.REACT_APP_SERVER_ADDRESS + '/login'}>Login</a>
            </div>
            <div className="songs-body"></div>
        </div>
    );
};
