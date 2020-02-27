import React from "react";

import { FormErrors } from "./FormErrors";

export const AlbumForm = props => {

  let doAction;
  if (props.onUpdateAlbum) {
    doAction = props.onUpdateAlbum;
  } else {
    doAction = props.onCreateAlbum;
  }

  let albumPlaceholder = {
    title: "enter album title",
    body: "enter album body"
  };
  
  if (props.album) {
    albumPlaceholder = {
        title: props.album.title,
        body: props.album.body
    }
  } 
  return (
    <form
      className="NewAlbumForm ui form"
      onSubmit={event => doAction(event)}
    >
      <div className="field">
        <label htmlFor="title">Title</label>
        <FormErrors errors={props.errors} forField="title" />
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={albumPlaceholder.title}
        />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <FormErrors
          errors={props.errors}
          forField="description"
        />
        <textarea 
          name="description" 
          id="description" 
          rows="3" 
          defaultValue={albumPlaceholder.body}
        />
      </div>
      <button className="ui orange button" type="submit">
        {props.buttonMessage}
      </button>
    </form>
  );
};