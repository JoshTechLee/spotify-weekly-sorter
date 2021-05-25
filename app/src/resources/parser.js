export const parseUserPlaylists = ({ userPlaylists, otherPlaylists, data, uri }) => {
    for (const playlist of data.items) {
        if (playlist.owner.uri === uri) userPlaylists.push(playlist);
        else otherPlaylists.push(playlist);
    }
    return {
        otherPlaylists,
        userPlaylists,
        areMorePlaylists: !!data.next,
    };
};

export const parsePlaylistToSongs = ({ data }) => ({ songs: data.tracks.items });

export const parseMilisecondsToStandard = ({ ms }) => {
    const seconds = Math.floor(ms / 1000)
        .toString()
        .slice(0, 2);
    const minutes = Math.floor(ms / 60000);
    console.log(seconds, minutes);
    return `${minutes}:${seconds}`;
};
