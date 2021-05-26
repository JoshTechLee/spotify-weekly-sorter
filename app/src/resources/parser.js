import { IMAGE_PLACEHOLDER } from './constants';

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

export const parsePlaylistToSongs = ({ data }) =>
    data.tracks.items.map(({ track }) => parseTrack({ track }));

export const parseArtists = ({ artists }) =>
    artists.reduce((result, artist) => `${result}, ${artist}`);

export const parseTrack = ({ track }) => ({
    name: track.name,
    artists: parseArtists({ artists: track.artists }),
    duration: track.duration_ms,
    album: track.album.name,
    image: track.album.images[0] ? track.album.images[0].url : IMAGE_PLACEHOLDER,
});

export const parseMilisecondsToStandard = ({ ms }) => {
    const seconds = Math.floor(ms / 1000)
        .toString()
        .slice(0, 2);
    const minutes = Math.floor(ms / 60000);
    return `${minutes}:${seconds}`;
};
