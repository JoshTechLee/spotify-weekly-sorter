export const parseUserPlaylists = ({ userPlaylists, otherPlaylists, data, uri }) => {
    for (const playlist of data.items) {
        if (playlist.owner.uri == uri) userPlaylists.push(playlist);
        else otherPlaylists.push(playlist);
    }
    return {
        otherPlaylists,
        userPlaylists,
        areMorePlaylists: !!data.next,
    };
};
