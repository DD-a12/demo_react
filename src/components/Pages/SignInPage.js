import React, { useState } from "react";

import { Session } from "../../api/Session";

export const SignInPage = props => {
  const [errors, setErrors] = useState([]);

  const createSession = event => {
    event.preventDefault();
    const { currentTarget: form } = event;

    const fd = new FormData(form);

    Session.create({
      email: fd.get("email"),
      password: fd.get("password")
    }).then(data => {
      if (data.status === 404) {
        setErrors([...errors, { message: "Wrong Email or Password" }]);
      } else {
        props.history.push("/");
        if (typeof props.onSignIn === "function") {
          props.onSignIn();
        }
      }
    });
  };
  return (
    <div className="ui clearing segment Page">
      <h1 className="ui center aligned header">Sign In</h1>
      <form className="ui large form" onSubmit={createSession}>
        {errors.length > 0 ? (
          <div className="ui negative message">
            <div className="header">Failed to Sign In</div>
            <p>{errors.map(error => error.message).join(", ")}</p>
          </div>
        ) : (
          ""
        )}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>

        <input
          className="ui right floated orange button"
          type="submit"
          value="Sign In"
        />
      </form>
    </div>
  );
};