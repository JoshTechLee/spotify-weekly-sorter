import './App.css';
import SearchBox from './components/search_box/SearchBox';
// import { spotifyAuthorization } from './resources/requests';
// import { codeVerifier } from './resources/helper';

import { useSelector, useDispatch } from 'react-redux';

function App() {
    // const spotifyAuth = () => {
    //     const code = codeVerifier();
    //     spotifyAuthorization({ code }).then((res) => console.log(res));
    // };

    return (
        <div className="App grid-container">
            <div className="playlists-header">
                <SearchBox />
            </div>
            <div className="songs-header">I am song header</div>
            <div className="playlists-body">I am playlist body</div>
            <div className="progress-bar"></div>
            <div className="songs-body"></div>
            {/* <header className="App-header">
                <h1>Counter: {counter}</h1>
                <button onClick={() => dispatch({ type: 'INCREMENT' })}>increment</button>
                <button onClick={() => dispatch({ type: 'DECREMENT' })}>decrement</button>
            </header> */}
        </div>
    );
}

export default App;
