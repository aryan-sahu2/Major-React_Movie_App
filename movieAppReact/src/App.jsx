import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Templates/Trending";
import Popular from "./Components/Templates/Popular";
import Movie from "./Components/Templates/Movie";
import TVShows from "./Components/Templates/TVShows";
import People from "./Components/Templates/People";
import MovieDetails from "./Components/Templates/MovieDetails";
import TvDetails from "./Components/Templates/TvDetails";
import PersonDetails from "./Components/Templates/PersonDetails";
import Trailer from "./Components/Templates/Trailer";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/tvshows" element={<TVShows />}></Route>
        <Route path="/people" element={<People />}></Route>
        <Route path="/people/details/:id" element={<PersonDetails />}></Route>

        <Route path="/movie/details/:id" element={<MovieDetails />}>
          
          <Route
            path="/movie/details/:id/trailer"
            element={<Trailer />}
          ></Route>
        </Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>

        <Route
            path="/tv/details/:id/trailer"
            element={<Trailer />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
