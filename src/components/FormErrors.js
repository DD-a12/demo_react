import React from "react";

export const FormErrors = props => {
  const { forField, errors = [] } = props;

  let filteredErrors = [];

  if(errors[forField]) {
      filteredErrors = errors[forField].map(err => err);
  }

  if (errors.length < 1) {
    return null;
  }

  return (
    <ul className="ui list">
      {filteredErrors.map((error, i) => (
        <li className="item" key={i}>{`${error}`}</li>
      ))}
    </ul>
  );
};