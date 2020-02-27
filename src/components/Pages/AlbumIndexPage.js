import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Album } from "../../api/Album";
import { Spinner } from "../Spinner";

export const AlbumIndexPage = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteAlbum = id => {
    const newAlbumsList = albums.filter(a => a.id !== id);
    Album.destroy(id).then(albums => {
      albums = newAlbumsList
      setAlbums(albums);
      setIsLoading(false);
    })
  };

  useEffect(() => {
    Album.all().then(albums => {
      setAlbums( albums );
      setIsLoading(false)
    });
  }, []);

  if (isLoading) {
    return <Spinner message="Wait to load the list of Albums" />;
  }
  if (albums.length > 0){

    return (
      <main>
      <h2 className="ui horizontal divider header">Album</h2>
      <ul className="ui list">
        {albums.map(album => (
          <li className="item" key={album.id}>
            <Link to={`/albums/${album.id}`} className="ui link" href="">
              {album.title}
            </Link>
            <button
              className="ui small right floated red button"
              onClick={() => deleteAlbum(album.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      </main>
    );
  } else {
    return (
      <div>
        <Link to={`/albums/new`} className="ui link" href="">
          Make New Album
        </Link>
      </div>
    )
  }
};