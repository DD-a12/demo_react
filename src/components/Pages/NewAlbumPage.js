import React, { useState } from "react";

import { Album } from "../../api/Album";
import { AlbumForm } from "../AlbumForm";

export const NewAlbumPage = props => {
  const [errors, setErrors] = useState([]);

  const createAlbum = event => {
    event.preventDefault();
    const { currentTarget } = event;
    const fd = new FormData(currentTarget);
    const newAlbum = {
      title: fd.get("title"),
      description: fd.get("description")
    };

    Album.create(newAlbum).then(data => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        props.history.push(`/albums/${data.id}`);
      }
    });

    currentTarget.reset();
  };
  return (
    <AlbumForm
      errors={errors}
      onCreateAlbum={createAlbum} 
      buttonMessage="Create Album"
    />
  );
};