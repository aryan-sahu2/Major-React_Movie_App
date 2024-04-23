import React from "react";

const NotFound = () => {
  const NotFound = [
    "4","0","4",":"," ","V",
    "i",
    "d",
    "e",
    "o",
    " ",
    "N",
    "o",
    "t",
    " ",
    "F",
    "o",
    "u",
    "n",
    "d",
  ];
  return (
    <div className="m-auto flex justify-end items-end gap-1 text-5xl text-white">
      {NotFound.map((e, i) => (
        <h1 key={i} className=" animate-pulse font-bold "  style={{ animationDelay: `${i * 90}ms` }}>
          {e}
        </h1>
      ))}
      <span className="animate-pulse text-7xl"> .</span>
    </div>
  );
};

export default NotFound;
