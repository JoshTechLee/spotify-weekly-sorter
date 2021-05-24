import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPlaylists } from '../../redux/actions/playlistActions';

function Playlists() {
    const dispatch = useDispatch();
    const { userPlaylists, otherPlaylists, areMorePlaylists, accessToken } = useSelector(
        (state) => {
            return {
                userPlaylists: state.playlists.userPlaylists,
                otherPlaylists: state.playlists.otherPlaylists,
                areMorePlaylists: state.playlists.areMorePlaylists,
                accessToken: state.accessToken.code,
            };
        }
    );

    useEffect(() => {
        console.log(areMorePlaylists);
        if (areMorePlaylists && accessToken) {
            dispatch(getUserPlaylists.request());
        }
    }, [dispatch]);

    const testing = () => {
        console.log(userPlaylists);
        console.log(otherPlaylists);
        console.log(areMorePlaylists);
        console.log(accessToken);
    };

    return (
        <ul className="playlists">
            <button onClick={testing}>testing</button>
            <button onClick={testing}>what what</button>
        </ul>
    );
}

export default Playlists;
