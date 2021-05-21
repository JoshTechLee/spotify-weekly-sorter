export const parseUserPlaylists = ({ userPlaylists, otherPlaylists, data, displayName }) => {
    for (const playlist of data.items) {
        if (playlist.owner.display_name == displayName) userPlaylists.push(playlist);
        else otherPlaylists.push(playlist);
    }
    return {
        otherPlaylists,
        userPlaylists,
        total: data.total,
        limit: data.limit,
        offset: data.offset,
        areMorePlaylists: !!data.next,
    };
};
