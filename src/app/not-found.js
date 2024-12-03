import React from "react";
import "./intro.css";
import Image from "next/image";

const notFound = () => {
  return (
    <div id="intro" className="flex flex-col items-center">
      <div id="intro-text">
        <center>
        <Image src="/404.png" alt="404" width={"404"} height={"404"}  />
          <h1 id="intro-head">Oops! Wrong Page</h1>
        </center>
       </div>
    </div>
  );
};

export default notFound;
