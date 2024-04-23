import { Link } from "react-router-dom";
import React from "react";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${
          data && data.backdrop_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[90vh]  flex flex-col p-[5%] gap-3 justify-end items-start"
    >
      <h1 className="text-5xl text-white mb-5 font-black ">
        {data.name || data.original_name || data.original_title}
      </h1>
      <p className=" text-white text-lg w-3/4 ">
        {data.overview.slice(0, 200)} ...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-sky-400 "> more</Link>
      </p>
      <p className="text-white ">
        <i className="ri-megaphone-line text-yellow-500  mr-1"></i>
        {data.release_date || data.first_air_date || "Information Unavailable"}       
        <i className="ri-video-line text-yellow-500  mr-1 ml-5"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="text-white border-[1px] px-4 border-[#6556CD] hover:bg-[#6556CD] duration-300 py-2 rounded-full ">Watch Trailer</Link>
    </div>
  );
};

export default Header;
