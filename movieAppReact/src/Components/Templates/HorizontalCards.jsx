import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data,  parentMediaType }) => {
  return  (
    <div className="flex justify-start gap-5  items-end overflow-x-auto pt-1 pr-1 rounded-md pb-3 h-[400px] sm:h-[510px] 2xl:h-[55vh] transition-all duration-300 hover:bg-[#00000041]">
        { data.length>0? data.map((item, index) => (
        <Link to={`/${item.media_type? item.media_type: parentMediaType}/details/${item.id}`}
          key={index}
          className="hover:-translate-y-3 rounded-md duration-300 relative overflow-hidden flex-shrink-0 lg:w-[239px] w-[200px] gap-5  h-full flex flex-col justify-end "
        >
          <img
            className="h-[72%] w-full object-center object-cover z-10 absolute top-0 left-0  "
            src={item.poster_path || item.backdrop_path ?`https://image.tmdb.org/t/p/original/${
              item.poster_path || item.backdrop_path
            }`: "https://imgs.search.brave.com/Jp6ngmaC-F_2y5_7UN2IF8HtgALS20IY1-qn-o5x8EA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzI5LzQyLzQy/LzM2MF9GXzQyOTQy/NDI3OV9kb2tFRndu/U29KZU9LcHF2VjF0/dFh1bThwaUVTc0Y1/TC5qcGc"}
            alt=""
          />
          <div
            style={{
              background: `linear-gradient(rgba(0,0,0,0.0),rgba(0,0,0,1))`,
            }}
            className="z-20 absolute bottom-0 h-[28%] overflow-y-auto  rounded-md px-4 py-2  "
          >
            <h1 className="text-[2.3vh] text-white mb-5 font-bold ">
              {(item.name || item.original_name || item.original_title).slice(0,30)} {(item.name || item.original_name || item.original_title).length>30}
            </h1>
            <p className=" text-white  font-semibold w-full ">
              {item.overview.slice(0, 70)} ...
              <span className="text-zinc-500 "> more</span>
            </p>
          </div>
        </Link>
      )): <h1 className="h-full w-full text-3xl font-bold bg-[#00000025] text-zinc-50 rounded-md text-center py-10">No Similar Stuff Found!</h1>}
    </div>
  )
};


export default HorizontalCards;

// linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8))
