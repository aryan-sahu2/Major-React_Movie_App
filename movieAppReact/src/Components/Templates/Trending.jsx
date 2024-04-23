import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Loading from "./Loading";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {

  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [page, setPage] = useState(1);
  const [trending, setTrending] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  document.title=`APDB | Trending ${category.toUpperCase()}`


  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setTrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending ? (
    trending.length > 0 ? (
      <div className="w-screen px-10 min-h-screen  ">
        <div className="w-full  flex  items-center">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line mr-10 hover:text-[#6556CD] font-bold text-zinc-300 text-2xl"
          ></i>

          <h1 className="text-3xl text-zinc-300 font-semibold">Trending</h1>

          <TopNav></TopNav>
          <Dropdown
            func={(e) => {
              setCategory(e.target.value);
            }}
            title="Category"
            options={["movie", "tv", "all"]}
          ></Dropdown>
          <Dropdown
            func={(e) => {
              setDuration(e.target.value);
            }}
            title="Duration"
            options={["week", "day"]}
          ></Dropdown>
        </div>

        <InfiniteScroll
          className="py-5 mb-10 mx-auto w-[90vw] "
          dataLength={trending.length}
          loader={<Loading />}
          next={getTrending}
          hasMore={hasMore}
        >
          <Cards data={trending}  title={category}></Cards>
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <Loading />
  );
};

export default Trending;
