import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
