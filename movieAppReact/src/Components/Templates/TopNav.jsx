import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const TopNav = () => {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);
  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[82%] h-[10vh] relative  flex items-center justify-start ml-[8%]">
      <i className=" text-zinc-400 text-3xl  ri-search-2-fill"></i>
      <input
        onChange={(e) => {
          setquery(e.target.value);
        }}
        value={query}
        className="w-[50%] mx-4 px-5 py-2 outline-none rounded-full border-none bg-zinc-900 text-white "
        type="text"
        placeholder="Search Anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className=" text-zinc-400 text-3xl ri-close-line"
        ></i>
      )}

      <div className="w-[70%] z-[100] absolute overflow-y-auto left-[4%] bg-zinc-200 max-h-[50vh] top-[100%] rounded-md">
        {searches &&
          searches.map((s, i) => (
            <Link to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="text-zinc-800 rounded-md duration-200 font-semibold hover:text-black hover:bg-zinc-300 py-3 px-10 w-full flex justify-start border-b-2 border-zinc-100  items-center   "
            >
              <img
                className="min-w-[150px] shadow-lg min-h-[150px] max-w-[10vh] max-h-[10vh] object-cover mr-10 rounded"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.poster_path || s.profile_path || s.backdrop_path
                      }`
                    : "https://imgs.search.brave.com/Jp6ngmaC-F_2y5_7UN2IF8HtgALS20IY1-qn-o5x8EA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzI5LzQyLzQy/LzM2MF9GXzQyOTQy/NDI3OV9kb2tFRndu/U29KZU9LcHF2VjF0/dFh1bThwaUVTc0Y1/TC5qcGc"
                }
                alt=""
              />
              <span>{s.name || s.original_name || s.original_title}</span>
            </Link>
          ))}
        {/* <Link className="text-zinc-800 rounded-md duration-200 font-semibold hover:text-black hover:bg-zinc-300 p-10 w-full flex justify-start border-b-2 border-zinc-100  items-center   ">
          <img src="" alt="" />
          <span>H</span>
        </Link> */}
      </div>
    </div>
  );
};

export default TopNav;
