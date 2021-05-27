import './songs.scss';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCurrentPlaylistSongs,
    setCurrentPlaylistSongs,
} from '../../redux/actions/playlistActions';
import Song from './song/Song';

function Songs() {
    const dispatch = useDispatch();
    const { songs } = useSelector((state) => {
        return {
            songs: state.currentPlaylist.songs,
            accessToken: state.accessToken.code,
        };
    });

    const clickable = () => {
        dispatch(setCurrentPlaylistSongs.clear());
        dispatch(getCurrentPlaylistSongs.request());
        console.log('clickable: songs');
        console.log(songs);
    };

    const clickable2 = () => {
        console.log(songs);
    };
    return (
        <ul className="Songs">
            <li>
                <button onClick={clickable}>something</button>
                <button onClick={clickable2}>something2</button>
            </li>
            {songs.map((song, index) => (
                <li key={song.id}>
                    <Song {...song} index={index + 1} />
                </li>
            ))}
        </ul>
    );
}

export default Songs;
