import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Loading from "./Loading";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const TVShows = () => {
  document.title = "APDB | TV Shows";
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [page, setPage] = useState(1);
  const [tvShows, settvShows] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getTVShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settvShows((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (tvShows.length === 0) {
      getTVShows();
    } else {
      setPage(1);
      settvShows([]);
      getTVShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tvShows ? (
    tvShows.length > 0 ? (
      <div className="w-screen px-10 min-h-screen  ">
        <div className="w-full  flex  items-center">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line mr-10 hover:text-[#6556CD] font-bold text-zinc-300 text-2xl"
          ></i>

          <h1 className="text-3xl text-zinc-300 font-semibold">
            {category.toUpperCase()} TV Shows{" "}
          </h1>

          <TopNav></TopNav>
          <Dropdown
            func={(e) => {
              setCategory(e.target.value);
            }}
            title="Category"
            options={["popular", "top_rated", "on_the_air", "airing_today"]}
          ></Dropdown>
        </div>

        <InfiniteScroll
          className="py-5 mb-10 mx-auto w-[90vw] "
          dataLength={tvShows.length}
          loader={<Loading />}
          next={getTVShows}
          hasMore={hasMore}
        >
          <Cards data={tvShows}  title="tv"></Cards>
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <Loading />
  );
};

export default TVShows;
