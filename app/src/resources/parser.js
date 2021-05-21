export const parseUserPlaylists = ({ data, displayName }) => ({
    playlists: data.items.filter((playlist) => playlist.owner.display_name == displayName),
    total: data.total,
    offset: data.offset,
    areMorePlaylists: !!data.next,
});
