import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useNavigate,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import { asyncloadmovie, removeMovie } from "../../store/actions/movieActions";
import Loading from "./Loading";
import HorizontalCards from "./HorizontalCards";
import { asyncloadTV, removeTV } from "../../store/actions/TvActions";

const TvDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const { pathname } = useLocation();


  useEffect(() => {
    dispatch(asyncloadTV(id));

    return () => {
      dispatch(removeTV());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${
          info.detail && info.detail.backdrop_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen relative transition-all min-h-screen px-[10%] overflow-x-hidden"
    >
      {/* part 1 : navigation*/}
      <nav className=" w-full  text-zinc-100 flex gap-10 py-6 text-xl">
        <Link
          onClick={() => {
            navigate(-1);
          }}
          className="ri-arrow-left-line mr-10 hover:text-[#6556CD] font-bold text-zinc-300 text-2xl"
        ></Link>
        {info.detail.homepage && (
          <a
            className="hover:scale-105 hover:text-white hover:shadow-black hover:shadow-md transition-all hover:-translate-y-1 px-2 "
            target="_blank"
            href={info.detail.homepage}
          >
            <i className="ri-external-link-fill"></i>
          </a>
        )}
        <a
          className="hover:scale-105 hover:text-white hover:shadow-black hover:shadow-md px-2 transition-all hover:-translate-y-1"
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i className="ri-global-line"></i>
        </a>
        <a
          className="hover:scale-105 hover:text-white hover:shadow-black hover:shadow-md px-2 transition-all hover:-translate-y-1"
          target="_blank"
          href={`https://www.imdb.com/title/${info.detail.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* part 2 : poster and details */}
      <div className="w-full flex transition-all ">
        <img
          className="h-[44vh] rounded object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path ||
            info.detail.backdrop_path ||
            info.detail.profile_path
          }`}
          alt=""
        />
        <div className="ml-10 flex flex-col gap-1 relative justify-start">
          <h1 className="text-5xl text-white font-bold ">
            {info.detail.title ||
              info.detail.name ||
              info.detail.original_name ||
              info.detail.original_title}{" "}
            <small className="text-zinc-200 text-3xl">
              {info.detail.first_air_date.split("-")[0]}
            </small>
          </h1>

          <div className="flex gap-4 mt-2  items-center text-white font-semibold">
            {info.detail.vote_average !== null &&
            info.detail.vote_average !== undefined &&
            info.detail.vote_average !== 0 ? (
              <div
                className={`text-white ${
                  (info.detail.vote_average * 10).toFixed() > 70
                    ? "bg-green-700"
                    : (info.detail.vote_average * 10).toFixed() > 35
                    ? "bg-yellow-600"
                    : "bg-red-600"
                } duration-300  font-semibold w-fit text-center p-3 rounded-full`}
              >
                {(info.detail.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            ) : (
              <div className="text-white bg-red-600 duration-300 font-semibold w-fit text-center p-3 rounded-full">
                N/A
              </div>
            )}

            <h1 className="font-semibold text-lg leading-4 ">
              User <br /> Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1 className="text-zinc-300">
              {info.detail.genres.map((g) => g.name).join(", ")}
            </h1>
            <h1>{info.detail.number_of_seasons} seasons</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-100">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mt-1   text-zinc-200 font-semibold">
            Overview
          </h1>
          <h3 className="text-md text-zinc-200 px-4 py-1 rounded hover:bg-[#00000049] hover:text-white transition-all">
            {info.detail.overview}
          </h3>

          <div className="relative  ">
            <h1 className="text-xl mt-2  text-zinc-300 font-semibold">
              Movie translated in
            </h1>
            <h3
              className={`text-md  px-4 py-1 rounded hover:bg-[#00000049] text-zinc-300 hover:h-full overflow-hidden hover:text-white transition-all  ${
                info.translations.length > 17 ? "h-10 " : "h-full"
              }`}
            >
              {info.translations.join(", ")}
            </h3>
          </div>

          <Link
            className="text-md mt-3 font-semibold hover:-translate-y-1  transition-all hover:shadow-md px-5 py-2 bg-[#6556CD] w-fit rounded-md text-white"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-large-fill "></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* part 3 : availability */}
      <div className="mt-5 transition-all">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center text-zinc-200 font-semibold capitalize text-lg gap-4 mt-5">
            <h1>Available on Platforms: </h1>
            {info.watchproviders &&
              info.watchproviders.flatrate &&
              info.watchproviders.flatrate.map((w,i) => (
                <img key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] rounded-md hover:shadow-black hover:shadow-md transition-all hover:-translate-y-1 "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />
              ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex items-center text-zinc-200 font-semibold capitalize text-lg gap-4 mt-5">
            <h1>Available to rent: </h1>
            {info.watchproviders &&
              info.watchproviders.rent &&
              info.watchproviders.rent.map((w) => (
                <img
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] rounded-md hover:shadow-black hover:shadow-md transition-all hover:-translate-y-1 "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />
              ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex items-center text-zinc-200 font-semibold capitalize text-lg gap-4 mt-5">
            <h1>Available to Buy: </h1>
            {info.watchproviders &&
              info.watchproviders.buy &&
              info.watchproviders.buy.map((w) => (
                <img
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] rounded-md hover:shadow-black hover:shadow-md transition-all hover:-translate-y-1 "
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                />
              ))}
          </div>
        )}
      </div>

      <hr className="my-9 border-none h-[1px] bg-zinc-500 rounded" />

      {/* part 4 : seasons  info.detail.seasons */}
      <h1 className=" text-white font-bold capitalize text-3xl mt-10 mb-4">
        Seasons{" "}
      </h1>
      <div className="flex gap-5 py-6 overflow-x-auto ">
        {info.detail.seasons.length>0? info.detail.seasons.map((item, index) => (
          <div key={index}
            className="flex gap-3 flex-shrink-0 flex-col transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-black"
          >
            <img
              className="h-[250px] xl:h-[280px] w-full flex-shrink-0 rounded object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
              src={`https://image.tmdb.org/t/p/original/${
                item.poster_path || item.backdrop_path || item.profile_path
              }`}
              alt=""
            />
            <h1 className="text-zinc-200 text-lg font-semibold mt-1                 ">
              {item.title ||
                item.name ||
                item.original_name ||
                item.original_title}
            </h1>
          </div>
        )) : <h1 className="h-full w-full text-3xl font-bold bg-[#00000025] text-zinc-50 rounded-md text-center py-10">No Seasons Stuff Found!</h1>}
      </div>

      <hr className="my-9 border-none h-[1px] bg-zinc-500 rounded" />

      {/* part 5 : recommendations and similarity */}

      {info.recommendations ? (
        <div className="my-5">
          <h1 className=" text-white font-bold capitalize text-3xl mt-10 mb-4">
            Recommendations{" "}
          </h1>
          <HorizontalCards data={info.recommendations}></HorizontalCards>
        </div>
      ) : (
        <div className="my-5">
          <h1 className=" text-white font-bold capitalize text-3xl mt-10 mb-4">
            Similar{" "}
          </h1>
          <HorizontalCards data={info.similar}></HorizontalCards>
        </div>
      )}

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
