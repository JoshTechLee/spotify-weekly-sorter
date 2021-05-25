import './Playlists.scss';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPlaylists } from '../../redux/actions/playlistActions';
import Playlist from './playlist/Playlist';

function Playlists() {
    const dispatch = useDispatch();
    const { userPlaylists, areMorePlaylists, accessToken } = useSelector((state) => {
        return {
            userPlaylists: state.playlists.userPlaylists,
            otherPlaylists: state.playlists.otherPlaylists,
            areMorePlaylists: state.playlists.areMorePlaylists,
            accessToken: state.accessToken.code,
        };
    });
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (areMorePlaylists && accessToken) {
            dispatch(getUserPlaylists.request());
        }
    }, [dispatch]);

    return (
        <div className="Playlists-container">
            <div className="SearchBox">
                <div className="input-container">
                    <input
                        id="auto"
                        placeholder="Filter Playlists"
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
            </div>
            <ul className="Playlists">
                {userPlaylists
                    .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                    .map((playlist) => (
                        <li key={playlist.id}>
                            <Playlist {...playlist} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Playlists;
