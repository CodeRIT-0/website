import React from 'react';
import Image from "next/image";

const Card = ({ person }) => {
  return (
    <div className="p-4">
      <div className="relative bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-yellow-500/50 hover:shadow-xl h-96">
      
        <a 
          href={person.url}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>

        <div className="p-6 flex flex-col items-center space-y-4">
         
          <div className="relative group w-[150px] h-[150px]">
            <div className="absolute -inset-0.5 bg-yellow-500 rounded-full opacity-50 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-full h-full">
              <Image 
                src={person.src}
                fill
                alt={person.name}
                className="rounded-full object-cover"
                sizes="250px"
              />
            </div>
          </div>

         
          <h2 className="text-2xl font-bold text-white mt-4">
            {person.name}
          </h2>

      
          <div className="bg-gray-700 p-4 rounded-lg w-full h-28 overflow-y-auto scrollbar-hide">
            <p className="text-yellow-500 text-center text-sm leading-relaxed">
              {person.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;