import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const testButton = () => {
    const newAccessToken =
        'BQAEfcMMQD2SLp4zRqYXz_qhOur27Y2ltDNq_v938ck17hKsG9H7vH82P4baLbV6JDBAIcem7Agl9fIybd9u9HoObH47gCqYmG_2aqNLX1Yayb1zUzF0r9irqfh55FiLn9QF0KnqVa9IQDuNa2c-6RQtt_27sWSR4GcH-JddXiuguoUqtf9ffGxp9cwH6fP1MRTCE8QEIU0Dw7UZhFwhEabo66ZLimYFsIcHPkPjKt8RHC9ci1_fxTPlBpQM1y1NKym_KCwC0rQVG-wf_cWwhF9QGB5Nzs1DwYdNgvHBNWLHzds';
    console.log('Bearer ' + newAccessToken);
    axios
        .get(
            'https://api.spotify.com/v1/me/playlists',
            { params: { limit: 50, offset: 0 } },
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + newAccessToken,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

function App() {
    return (
        <div className="App">
            <button onClick={testButton}>testing</button>
        </div>
    );
}

export default App;
