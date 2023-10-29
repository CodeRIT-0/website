// import Image from 'next/image'

// export default function Home() {
//   return (
//     <>
//       <div className="pt-[100px] bg-gradient-to-r from-cyan-500 to-blue-500 px-4">
//        <div className="grid grid-cols-2 gap-2 p-3 w-full  min-h-[300px]">
//          <div className="border-2 border-amber-500 flex justify-center align-center">
//           <Image src="/homebg.jpeg"   
//             width={0}
//             height={0}
//             sizes="100vw"
//             style={{ width: '90%', height: 'auto' }}/>    
//          </div>
//          <div  className="border-2 border-amber-500 break-words">
//             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> 
//          </div>
//        </div>
//        <div>
//         <h1 className='text-center text-2xl'>About</h1>
//         <p className='break-words pb-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//         <p className='break-words pb-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//         <p className='break-words pb-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        
//        </div>
//       </div>
//     </>
//   )
// }




import React from "react";
import "./intro.css";
import Image from "next/image";

const Intro = () => {
  return (
    <div id="intro" className="flex flex-col items-center">
        <div className="announcement" >
        <a href="https://linktr.ee/Code_rit" style={{ animation: 'blinker 1s linear infinite', color: '#f00' }}>
          <p>Link Tree Of CodeRit</p>
        </a>
                
        
      </div>
      <div className="container ">
        <img
          src="./Intro Video.gif"
          alt="test"
          className="introimg w-full"
        />
        
        {/* <div className="centered">
          <h2 className="text-red-700 text-4xl">
            A community that helps develop the Coding Culture of Ramaiah
            Institute of Technology
          </h2>
        </div> */}
      </div>
      <div id="intro-text">
        <center>
          <h1 id="intro-head">About</h1>
        </center>
        <p id="intro-para">
          CodeRIT is the official coding club of our college and the most active
          technical club our college. We guide students through their journey to
          find their passion for technology through our hackathons, regular
          contests, workshop and information about competitions like ACM-ICPC,
          Google Code Jam, Google Summer of Code, and other online coding
          events. We conduct workshops on areas of computer science like web
          development, resume building, Git/GitHub etc. We conduct coding
          competitions which are open to all branches with exciting prizes to
          the winners and best female coder - Coding Diva as well.
        </p>
        <div id="grid">
          <div id="grid-item">
            <center>
              <h3>Vision</h3>
            </center>
            <p>
              Creating a Community of enthusiastic coders with holistic
              development of how to approach a problem, problem solving and
              logic building.
            </p>
          </div>
          <div id="grid-item">
            <center>
              <h3>Mission</h3>
            </center>

            <p>
              Aims to establish a coding culture on campus, reaching every
              student passionate about coding. The club’s motto is to
              Create-Build-Innovate-Solve. <br></br>
              {/* The club helps members
              develop an aptitude for logical thinking and visualising a problem
              from various perspectives and creating multiple innovative
              solutions */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
