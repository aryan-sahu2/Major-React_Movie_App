import React, { useState, useEffect } from "react";
import SideNav from "./Templates/SideNav";
import TopNav from "./Templates/TopNav";
import Header from "./Templates/Header";
import HorizontalCards from "./Templates/HorizontalCards";
import Dropdown from "./Templates/Dropdown";
import axios from "../utils/axios";
import Loading from "./Templates/Loading";
import { Outlet } from "react-router-dom";
import {Routes, Route} from "react-router-dom"



const Home = () => {
  document.title = "APDB | HomePage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData = (Math.random() * data.results.length).toFixed();
      setWallpaper(data.results[randomData]);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);

  return (wallpaper && trending )? (
    <>
      <SideNav className="h-screen " />
      <div className="w-[82%] h-full right-0 absolute overflow-y-auto overflow-x-hidden">
        <TopNav />
        <Header data={wallpaper} />

        <div className=" flex justify-between px-6 py-9">
          <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>

        <HorizontalCards data={trending} />

       
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
