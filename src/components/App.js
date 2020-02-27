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
import { HomePage } from "./Pages/HomePage";
import { NewAlbumPage } from "./Pages/NewAlbumPage"
import { AlbumShowPage }  from "./Pages/AlbumShowPage"

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
        <BrowserRouter>
          <header>
            <NavBar
              currentUser={currentUser}
              onSignOut={destroySession}
            />
          </header>
          <div className="ui container segment">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/albums" component={AlbumIndexPage} />
              <Route
                path="/sign_up"
                render={routeProps => (
                  <SignUpPage {...routeProps} onSignUp={getUser} />
                )}
              />
              <Route    
                path="/sign_in"
                render={routeProps => (
                  <SignInPage {...routeProps} onSignIn={getUser} />
                )}
              />
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
          </div>
        </BrowserRouter>
    );
}

export default App