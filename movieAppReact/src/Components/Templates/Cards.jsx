import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data , title }) => {
  return (
    <div className="min-h-screen  mt-10 flex flex-wrap mb-20 gap-14 mx-auto w-[90vw] ">
      {data.map((card, index) => (
        <Link to={`/${card.media_type || title}/details/${card.id}`}
          key={index}
          className="w-[240px] md:w-[230px] lg:w-[220px] h-[45.5vh] my-5 relative transition-all hover:translate-y-2 hover:shadow-2xl hover:shadow-black flex-shrink-0 group "
        >
          <img
            className="h-[44vh] w-full rounded object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={card.poster_path || card.backdrop_path || card.profile_path?`https://image.tmdb.org/t/p/original/${
              card.poster_path || card.backdrop_path || card.profile_path
            }`:"https://imgs.search.brave.com/Jp6ngmaC-F_2y5_7UN2IF8HtgALS20IY1-qn-o5x8EA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzI5LzQyLzQy/LzM2MF9GXzQyOTQy/NDI3OV9kb2tFRndu/U29KZU9LcHF2VjF0/dFh1bThwaUVTc0Y1/TC5qcGc"}
            alt=""
          />
          <h1 className="text-zinc-200 font-semibold mt-1                 ">
            {card.title ||
              card.name ||
              card.original_name ||
              card.original_title}
          </h1>
          {card.vote_average !== null &&
            card.vote_average !== undefined &&
            card.vote_average !== 0 ? (
              <div
                className={ `group-hover:opacity-100 opacity-45 transition-opacity duration-300 font-semibold w-fit absolute bottom-[-6%]  right-[-3%] text-white ${(card.vote_average * 10).toFixed()>70?"bg-green-700":(card.vote_average * 10).toFixed()>35?"bg-yellow-600":"bg-red-600"} duration-300 font-semibold w-fit text-center p-3 rounded-full`}
              >
                {(card.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            ) : card.vote_average ==0?(
              <div className="text-white bg-red-600group-hover:opacity-100 opacity-45 transition-opacity  absolute bottom-[-6%]  right-[-3%]  duration-300 font-semibold w-fit text-center p-3 rounded-full bg-red-600">
                N/A
              </div>
            ):<></>}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
