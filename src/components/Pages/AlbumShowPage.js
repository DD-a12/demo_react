import React, { useState, useEffect } from "react";

import { Album } from "../../api/Album"; 
import { Spinner } from "../Spinner";
import { FormErrors } from "../FormErrors";

export const AlbumShowPage = props => {
  const [ albumShow, setAlbumShow ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ errors, setErrors ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState({
    activePage: 15
  });

  const currentAlbumId = props.match.params.id

  const handlePageChange = pageNumber => {
    setPageNumber({activePage: pageNumber});
  }

  const deleteAlbum = () => {
    Album.destroy(currentAlbumId).then(data => {
      if (data.errors) {
        setErrors(data.errors);
      } else {
        props.history.push(`/albums/`);
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
    const fileLength = document.querySelector('input[type=file]').files.length
    for (let i = 0; i < fileLength; i++) {
      fd.append("pictures[]", document.querySelector('input[type=file]').files[i])
    }

    console.log(fd)

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
      <form onSubmit={uploadPics} className="pictures form" >
        <label>Pictures</label>
        <input type="file" name="pic" multiple />
        <button className="ui blue button" type="submit">
          upload Pictures
        </button>
      </form>
      <div className="pictures ul" >
          {albumShow.pictures.map(pic => (
            <li className="pictures list" key={pic.id}>
            <p className="picture title">{pic.content_type}</p>
            <img src={pic.url} className="picture url" />
            <button
              className="ui small right floated red button"
              onClick={() => deletePicture(pic.id)}
              >
                Delete picture
            </button>
            </li>
          ))}
      </div>
      <button
      className="ui small right floated red button"
      onClick={() => deleteAlbum()}
      >
        Delete
      </button>
    </div>
  );

}