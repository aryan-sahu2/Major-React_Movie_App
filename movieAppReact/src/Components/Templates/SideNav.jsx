import React from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  
  return (
    <div className="sideNav w-[18%] fixed h-screen  overflow-y-auto px-10 border-zinc-600 border-r-2 ">
      <h1 className="text-white text-2xl mt-5 font-bold">
        <i className="ri-film-line mr-2 text-[#6556CD] text-2xl"></i>
        APDB
      </h1>

      <nav className="flex flex-col text-zinc-400 text-xl gap-3 font-medium">
        <h1 className="text-white font-semibold text-xl mt-10 mb-5">
          New Feeds
        </h1>
        <NavLink to="/trending" className="hover:bg-[#6556CD] hover:font-semibold hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-fire-fill mr-2"></i>Trending
        </NavLink>
        <NavLink to="/popular" className="hover:bg-[#6556CD] hover:font-semibold hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-sparkling-fill mr-2"></i>Popular
        </NavLink>
        <NavLink to="/movie" className="hover:bg-[#6556CD] hover:font-semibold hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-movie-fill mr-2"></i>Movies
        </NavLink>
        <NavLink to="/tvshows" className="hover:bg-[#6556CD] hover:font-semibold hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-tv-line mr-2"></i>TV Shows
        </NavLink>
        <NavLink to="/people" className="hover:bg-[#6556CD] mb-3 hover:font-semibold hover:text-white duration-300 rounded-lg p-5">
          <i className="ri-team-fill mr-2"></i>People
        </NavLink>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-1 font-medium">
        <h1 className="text-white font-semibold text-xl mt-3 mb-3">
          Website Information
        </h1>
        <NavLink className="hover:bg-[#6556CD] hover:font-semibold hover:text-white duration-300 rounded-lg px-5 py-3">
          <i className="ri-phone-line mr-2"></i>Contact
        </NavLink>
        <NavLink className="hover:bg-[#6556CD] hover:font-semibold hover:text-white duration-300 rounded-lg px-5 py-3">
          <i className="ri-information-fill mr-2"></i>About APDB
        </NavLink>
      </nav>
    </div>
  );
};

export default SideNav;
