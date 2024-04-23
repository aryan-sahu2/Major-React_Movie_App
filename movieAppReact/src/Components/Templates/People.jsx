import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import axios from "../../utils/axios";
import Loading from "./Loading";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "APDB | TV Shows";
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [people, setPeople] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getTVShows = async () => {
    try {
      const { data } = await axios.get(`/person/popular?page=${page}`);

      if (data.results.length > 0) {
        setPeople((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      getTVShows();
    } else {
      setPeople([]);
      getTVShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, []);
  return people ? (
    people.length > 0 ? (
      <div className="w-screen px-10 min-h-screen  ">
        <div className="w-full  flex  items-center">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line mr-10 hover:text-[#6556CD] font-bold text-zinc-300 text-2xl"
          ></i>

          <h1 className="text-3xl text-zinc-300 font-semibold">People</h1>

          <TopNav></TopNav>
        </div>

        <InfiniteScroll
          className="py-5 mb-10 mx-auto w-[90vw] "
          dataLength={people.length}
          loader={<Loading />}
          next={getTVShows}
          hasMore={hasMore}
        >
          <Cards data={people} title="people" ></Cards>
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <Loading />
  );
};

export default People;
