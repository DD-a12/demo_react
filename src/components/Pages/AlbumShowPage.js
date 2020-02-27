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
    Album.destroy(currentAlbumId).then(() => {
      props.history.push("/albums");
    });
  };

  const uploadPics = event => {
    event.preventDefault();
    const { currentTarget } = event;
    const fd = new FormData(currentTarget);

    const newPics = {
      pictures: fd.get("pictures")
    };
    console.log(newPics)
    Album.update(currentAlbumId, newPics).then(data => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        props.history.push(`/albums/${currentAlbumId}`);
      }
    });
    currentTarget.reset();
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
  console.log(albumShow)
  return(
    <div className="AlbumShowPage">
      <header>
        {albumShow.title}
      </header>
      <p>
        {albumShow.description}
      </p>
      <form className="NewAlbumForm ui form"
      onSubmit={uploadPics}>
        <div className="field">
          <label htmlFor="pictures">Pictures</label>
          <FormErrors errors={props.errors} forField="pictures" />
          <input
            type="file"
            name="pictures"
            id="pictures"
          />
        </div>
        <button className="ui orange button" type="submit">
          upload
        </button>
      </form>
      <button
      className="ui small right floated red button"
      onClick={() => deleteAlbum()}
      >
        Delete
      </button>
    </div>
  );

}