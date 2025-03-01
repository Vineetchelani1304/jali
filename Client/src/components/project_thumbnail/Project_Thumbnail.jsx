import React from "react";

function Project_Thumbnail({ imgSrc, title }) {
  return (
    <div className="text-center">
      <img
        src={imgSrc}
        alt={title}
        className="w-10 h-10 rounded-md object-cover mx-auto"
      />
      <p className="mt-2 text-sm font-medium">{title}</p>
    </div>
  );
}

export default Project_Thumbnail;
