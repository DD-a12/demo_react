import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Album } from "../../api/Album"; 
import { Spinner } from "../Spinner";
import { FormErrors } from "../FormErrors";

export const AlbumShowPage = props => {
  const [ albumShow, setAlbumShow ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errors, setErrors ] = useState([]);

  const currentAlbumId = props.match.params.id

  const deleteAlbum = () => {
    Album.destroy(currentAlbumId).then(data => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        props.history.push(`/albums/${data.id}`);
      }
    });
  };

  const deletePicture = (id) => {
    Album.destroyPics(currentAlbumId, id).then(data => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setAlbumShow(data)
      }
    });
  }

  const uploadPics = event => {
    event.preventDefault();
    const { currentTarget: formNode } = event;
    const fd = new FormData(formNode);
    

    Album.update(currentAlbumId, fd ).then(data => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setAlbumShow(data)
      }
    });
  }

  useEffect(() => {
    Album.one(currentAlbumId).then(album => {
      setAlbumShow(album);
      setIsLoading(false);
    });
  }, [currentAlbumId]);

  if(isLoading){
    return <Spinner message="Albums are loading" />;
  }
  return(
    <div className="AlbumShowPage">
      <header>
        {albumShow.title}
      </header>
      <p>
        {albumShow.description}
      </p>
      <form onSubmit={uploadPics}>
        <label>Pictures</label>
        <input type="file" name="pictures" />
        <button className="ui blue button" type="submit">
          Save Changes
        </button>
      </form>
          {albumShow.pictures.map(pic => (
            <li className="pictures list">
            <img src={pic.url} />
            <button
              className="ui small right floated red button"
              onClick={() => deletePicture(pic.id)}
              >
                Delete picture
            </button>
            </li>
          ))}
      <button
      className="ui small right floated red button"
      onClick={() => deleteAlbum()}
      >
        Delete
      </button>
    </div>
  );

}