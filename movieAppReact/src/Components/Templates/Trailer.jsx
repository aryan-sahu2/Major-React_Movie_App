import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useLocation , Link , useNavigate } from "react-router-dom";
import ReactPlayer, {controls} from "react-player";
import NotFound from "./NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);


  // Add event listener to handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className=" fixed  top-0 left-0 z-[1000] w-screen h-screen flex items-center justify-center overflow-y-hidden bg-[#0000009a]">
      <Link
        onClick={() => {
          navigate(-1);
        }}
        className="ri-close-fill absolute top-10 bg-[#74747460] border-none left-10 hover:bg-[#2f2f317c] -translate-x-[50%] transition-all -translate-y-[50%] px-4 py-3 rounded-full mr-10 hover:text-[#6556CD] font-bold text-zinc-300 text-2xl"
      ></Link>
      {ytVideo && ytVideo.key ? (
        <ReactPlayer
          width={`85vw`}
          height={`95vh`}
          controls
          url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        />
      ) : (
        <NotFound/>
      )}
    </div>
  );
};

export default Trailer;
