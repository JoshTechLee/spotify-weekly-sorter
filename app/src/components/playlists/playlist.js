function Playlist({ image, title, description, isSongAdded }) {
    const [color, setColor] = useState('red');
    return (
        <div className="playlist">
            {image ? <image src={image} /> : 'N/A'}
            <div className="playlist-body">
                <h3 className="playlist-title">{title}</h3>
                <p className="playlist-body">{description}</p>
            </div>
        </div>
    );
}

export default Playlist;
