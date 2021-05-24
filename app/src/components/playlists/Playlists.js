import './Playlists.scss';
import React, { useEffect } from 'react';
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

    useEffect(() => {
        if (areMorePlaylists && accessToken) {
            dispatch(getUserPlaylists.request());
        }
    }, [dispatch]);

    const clickable = () => {
        console.log(userPlaylists);
        console.log(userPlaylists[0].images[0].url);
    };

    return (
        <ul className="Playlists">
            {userPlaylists.map((playlist) => (
                <li>
                    <Playlist {...playlist} />
                </li>
            ))}
        </ul>
    );
}

export default Playlists;
