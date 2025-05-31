import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import LoginComponent from './Pages/Users/LoginComponent';
import RegisterComponent from './Pages/Users/RegisterComponent';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import MyNavBar from './components/MyNavBar';
import Favorites from './Pages/MoviesList/Favorites';
import MoviesList from './Pages/MoviesList/MoviesList';
import MoviesDetails from './Pages/MoviesList/MoviesDetails';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <MyNavBar />
          <div className="container">
            <Switch>
              <Route path={"/"} component={Home} exact />
              <Route path={"/login"} component={LoginComponent} exact />
              <Route path={"/Register"} component={RegisterComponent} exact />
              <Route path={"/movies"} component={MoviesList} exact />
              <Route path={"/movies/:Id"} component={MoviesDetails} exact />
              <Route path={"/favorites"} component={Favorites} exact />
              <Route path={"*"} component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </div>
  );
}

export default App;
