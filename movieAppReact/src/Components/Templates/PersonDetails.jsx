import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
  asyncloadperson,
  removePerson,
} from "../../store/actions/PersonActions";
import Loading from "./Loading";
import HorizontalCards from "./HorizontalCards";
import Dropdown from "./Dropdown";

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  return info ? (
    <div className="w-screen relative transition-all min-h-screen px-[7%] ">
      <nav className=" w-full  text-zinc-100 flex gap-10 py-6 text-xl">
        <Link
          onClick={() => {
            navigate(-1);
          }}
          className="ri-arrow-left-line mr-10 hover:text-[#6556CD] font-bold text-zinc-300 text-2xl"
        ></Link>
      </nav>

      {/* Body */}
      <div className="flex ">
        {" "}
        {/* Left part */}
        <div className="sm:w-[30vw] md:w-[27vw] lg:w-[24vw] xl:w-[22vw] 2xl:w-[20vw]  flex flex-col transition-all pb-10 ">
          {/* Photo and icons */}
          <img
            className="sm:w-[30vw] md:w-[27vw] lg:w-[24vw] xl:w-[22vw] 2xl:w-[20vw] rounded object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path ||
              info.detail.backdrop_path ||
              info.detail.profile_path
            }`}
            alt=""
          />
          <hr className="my-9 border-none h-[1px] bg-zinc-500 rounded" />

          {/* Icons and profiles */}
          <div className="sm:w-[30vw] md:w-[27vw] lg:w-[24vw] xl:w-[22vw] 2xl:w-[20vw]  mb-4 text-zinc-100  text-xl">
            {info.externalId.wikidata_id && (
              <a
                className="hover:scale-105 py-1  hover:text-white hover:shadow-black hover:shadow-md px-2 transition-all hover:-translate-y-1"
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info.externalId.facebook_id && (
              <a
                className="hover:scale-105 py-1  hover:text-white hover:shadow-black hover:shadow-md px-2 transition-all hover:-translate-y-1"
                target="_blank"
                href={`https://www.facebook.com/${info.externalId.facebook_id}`}
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info.externalId.instagram_id && (
              <a
                className="hover:scale-105 py-1  hover:text-white hover:shadow-black hover:shadow-md px-2 transition-all hover:-translate-y-1"
                target="_blank"
                href={`https://www.instagram.com/${info.externalId.instagram_id}`}
              >
                <i className="ri-instagram-line"></i>
              </a>
            )}
            {info.externalId.twitter_id && (
              <a
                className="hover:scale-105 py-1  hover:text-white hover:shadow-black hover:shadow-md px-2 transition-all hover:-translate-y-1"
                target="_blank"
                href={`https://www.twitter.com/${info.externalId.twitter_id}`}
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
            {info.detail.imdb_id && (
              <a
                className="hover:scale-105 py-1  hover:text-white font-semibold hover:font-bold hover:shadow-black hover:shadow-md px-2 transition-all hover:-translate-y-1"
                target="_blank"
                href={`https://www.imdb.com/title/${info.detail.imdb_id}`}
              >
                imdb
              </a>
            )}
          </div>

          {/* Personal details */}
          <h1 className=" text-zinc-300 font-semibold capitalize text-xl ">
            Personal Info{" "}
          </h1>

          <h1 className=" text-zinc-300 font-semibold capitalize text-lg mt-3">
            Known For{" "}
          </h1>
          <h1 className=" text-zinc-400 font-medium capitalize text-base ">
            {info.detail.known_for_department}
          </h1>

          <h1 className=" text-zinc-300 font-semibold capitalize text-lg mt-3">
            Gender{" "}
          </h1>
          <h1 className=" text-zinc-400 font-medium capitalize text-base ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          {info.detail.birthday && (
            <>
              <h1 className=" text-zinc-300 font-semibold capitalize text-lg mt-3">
                Birthday
              </h1>
              <h1 className=" text-zinc-400 font-medium capitalize text-base ">
                {info.detail.birthday}
              </h1>
            </>
          )}

          {info.detail.deathday && (
            <>
              <h1 className=" text-zinc-300 font-semibold capitalize text-lg mt-3">
                Deathday
              </h1>
              <h1 className=" text-zinc-400 font-medium capitalize text-base ">
                {info.detail.deathday}
              </h1>
            </>
          )}

          {info.detail.place_of_birth && (
            <>
              <h1 className=" text-zinc-300 font-semibold capitalize text-lg mt-3">
                Place of Birth
              </h1>
              <h1 className=" text-zinc-400 font-medium capitalize text-base ">
                {info.detail.place_of_birth}
              </h1>
            </>
          )}

          {info.detail.also_known_as.join(", ") && (
            <>
              <h1 className=" text-zinc-300 font-semibold capitalize text-lg mt-3">
                Also Known As
              </h1>
              <h1 className=" text-zinc-400 font-medium capitalize text-base ">
                {info.detail.also_known_as.join(",  ")}
              </h1>
            </>
          )}
        </div>
        {/* Right Part */}
        <div className=" pl-10 relative sm:w-[54.5vw] md:w-[56vw] lg:w-[61vw] xl:w-[64vw] 2xl:w-[66vw]">
          <h1 className="select-none text-zinc-300 hover:text-white transition-all font-bold capitalize text-6xl ">
            {info.detail.name}
          </h1>

          {info.detail.biography && (
            <>
              <h1 className=" text-zinc-300 font-semibold capitalize text-2xl mt-5">
                Biography
              </h1>
              <p className="text-zinc-400 mt-2 font-medium w-[95%] hover:bg-[#00000048] rounded-md duration-500 hover:text-white transition-all px-2 py-1 ">
                {info.detail.biography}
              </p>
            </>
          )}

          {info.combinedCredits.cast && (
            <>
              <h1 className=" text-zinc-300 font-semibold capitalize text-2xl mt-5 mb-2">
                Famous for their work in
              </h1>
              <HorizontalCards data={info.combinedCredits.cast} />
            </>
          )}

          {info[category + "Credits"].cast && (
            <>
              <div className="flex w-full justify-between mt-7 items-center">
                <h1 className=" text-zinc-300 font-semibold capitalize text-2xl mt-5 mb-2">
                  Characters Played
                </h1>
                <Dropdown
                  title={"Category"}
                  options={["tv", "Movie"]}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="w-full h-[50vh] mt-5 transition-all overflow-x-hidden overflow-y-auto shadow-lg hover:shadow-[rgba(255,255,255,0.19)] rounded-md border-2 border-zinc-700 p-5 text-zinc-400">
                {info[category + "Credits"].cast.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-white hover:bg-[#19191d] py-4 px-2 duration-300 rounded-md"
                  >
                    <Link to={`${category}/details/${item.id}`}>
                      <span>
                        {item.title ||
                          item.name ||
                          item.original_name ||
                          item.original_title}
                      </span>
                      <span className="block pl-6 mt-2">
                        {item.character && `Character name:  ${item.character}`}
                      </span>
                    </Link>
                  </li>
                ))}
              </div>
            </>
          )}

          <div className="mb-10"></div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
