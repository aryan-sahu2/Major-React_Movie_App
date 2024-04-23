import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Loading from "./Loading";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
    document.title="APDB | Popular"
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [page, setPage] = useState(1);
  const [popular, setPopular] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(
        `/${category}/popular?page=${page}`
      );

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular ? (
    popular.length > 0 ? (
      <div className="w-screen px-10 min-h-screen  ">
        <div className="w-full  flex  items-center">
          <i
            onClick={() => {
              navigate(-1);
            }}
            className="ri-arrow-left-line mr-10 hover:text-[#6556CD] font-bold text-zinc-300 text-2xl"
          ></i>

          <h1 className="text-3xl text-zinc-300 font-semibold">Popular</h1>

          <TopNav></TopNav>
          <Dropdown
            func={(e) => {
              setCategory(e.target.value);
            }}
            title="Category"
            options={["movie", "tv"]}
          ></Dropdown>
          
        </div>

        <InfiniteScroll
          className="py-5 mb-10 mx-auto w-[90vw] "
          dataLength={popular.length}
          loader={<Loading />}
          next={getPopular}
          hasMore={hasMore}
        >
          <Cards data={popular}  title={category}></Cards>
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <Loading />
  );
};

export default Popular;
