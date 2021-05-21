import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPlaylists } from '../../redux/actions/playlistActions';

function Playlists() {
    const dispatch = useDispatch();
    const { userPlaylists, otherPlaylists, areMorePlaylists } = useSelector((state) => {
        console.log(state);
        // console.log(state.playlists);
        return {
            userPlaylists: state.playlists.userPlaylists,
            otherPlaylists: state.playlists.otherPlaylists,
            areMorePlaylists: state.playlists.areMorePlaylists,
        };
    });

    useEffect(() => {
        console.log(areMorePlaylists);
        if (areMorePlaylists) {
            dispatch(getUserPlaylists.request());
        }
    }, [dispatch]);

    const testing = () => {
        console.log(userPlaylists);
        console.log(otherPlaylists);
        console.log(areMorePlaylists);
    };

    return (
        <ul className="playlists">
            <button onClick={testing}>testing</button>
        </ul>
    );
}

export default Playlists;
