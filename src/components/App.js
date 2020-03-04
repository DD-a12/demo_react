import React, {useState, useCallback, useEffect} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { User } from "../api/User";
import { Session } from "../api/Session";

import { NavBar } from "./NavBar";
import { AuthRoute } from "./AuthRoute";

import { NotFoundPage } from "./Pages/NotFoundPage";
import { SignInPage } from "./Pages/SignInPage"
import { AlbumIndexPage } from "./Pages/AlbumIndexPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { NewAlbumPage } from "./Pages/NewAlbumPage";
import { AlbumShowPage }  from "./Pages/AlbumShowPage";
import './Assets/Css/Album.css'

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const getUser = useCallback(() => {
        User.current().then(data => {
            if (typeof data.id !== "number") {
                setCurrentUser(null);
            } else {
                setCurrentUser(data);
            }
        });
    }, []);

    const destroySession = () => {
        Session.destroy().then(setCurrentUser(null));
    };

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
      <>
        {!currentUser ? (
          <BrowserRouter>
            <Route
              path="/sign_up"
              render={routeProps => (
                <SignUpPage {...routeProps} onSignUp={getUser} />
              )}
            />
          <Route    
            path="/"
            render={routeProps => (
              <SignInPage {...routeProps} onSignIn={getUser} />
              )}
              />
          </BrowserRouter>
        ): (
          <BrowserRouter>
            <header>
              <NavBar
                currentUser={currentUser}
                onSignOut={destroySession}
                />
            </header>
              <Switch>
              <Route exact path="/albums" component={AlbumIndexPage} />
              <AuthRoute
                isAuthenticated={!!currentUser}
                component={NewAlbumPage}
                path="/albums/new"
                exact
                />
              <AuthRoute
                isAuthenticated={!!currentUser}
                component={AlbumShowPage}
                path="/albums/:id"
                exact
              />
              <Route component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        )}
      </>
    );
}

export default App