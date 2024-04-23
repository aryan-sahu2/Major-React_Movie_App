import React from "react";

const Loading = () => {
    const Loading = ["L","o","a","d","i","n","g"]
  return (
    <div className="m-auto flex gap-1 text-5xl text-white">
      {Loading.map((e, i) => (
        <h1 key={i} className=" animate-pulse font-bold " style={{ animationDelay: `${i * 100}ms` }}>{e}</h1>
      ))}
      <span className="animate-pulse"> .</span>
      <span className="animate-pulse"> .</span>
      <span className="animate-pulse"> .</span>
    </div>
  );
};

export default Loading;
