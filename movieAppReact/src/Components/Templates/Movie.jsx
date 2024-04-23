import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Loading from "./Loading";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Movie = () => {
  document.title = "APDB | Movies";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setMovies((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (movies.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovies([]);
      getMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movies ? (
    movies.length > 0 ? (
      <div className="w-screen px-10 min-h-screen  ">
        <div className="w-full  flex  items-center">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line mr-10 hover:text-[#6556CD] font-bold text-zinc-300 text-2xl"
          ></i>

          <h1 className="text-3xl text-zinc-300 font-semibold">{category.toUpperCase()} Movies </h1>

          <TopNav></TopNav>
          <Dropdown
            func={(e) => {
              setCategory(e.target.value);
            }}
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
          ></Dropdown>
        </div>

        <InfiniteScroll
          className="py-5 mb-10 mx-auto w-[90vw] "
          dataLength={movies.length}
          loader={<Loading />}
          next={getMovie}
          hasMore={hasMore}
        >
          <Cards data={movies}  title="movie"></Cards>
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <Loading />
  );
};

export default Movie;
