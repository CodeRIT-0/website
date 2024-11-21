import Image from "next/image";

export default function EventCard({ name, year, date, description, url }) {
  return (
    <div className="flex justify-center items-center m-4">
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700/50 rounded-xl 
        shadow-lg transition-all duration-300 ease-in-out
        hover:shadow-2xl hover:shadow-indigo-500/20 
        hover:border-indigo-500/30
        hover:scale-[1.02] ">
        <div className="p-6 h-[460px] flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden ring-2 ring-indigo-500/30 hover:ring-indigo-400/50 transition-all duration-300 hover:shadow-yellow-500/50 hover:shadow-xl">
            <Image
              src={url}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 192px) 100vw, 192px"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-400 mb-2 text-center">
            {name}
          </h1>
          
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 text-sm font-medium text-indigo-200 bg-indigo-900/30 rounded-full border border-indigo-700/20">
              {year}
            </span>
            <span className="px-3 py-1 text-sm font-medium text-indigo-200 bg-indigo-900/30 rounded-full border border-indigo-700/20">
              {date}
            </span>
          </div>
          
          <div className="w-full">
            <div className="relative overflow-hidden">
              <p className="text-gray-300 text-sm leading-relaxed scrollbar-hide hover:scrollbar-default transition-all duration-300 max-h-32 overflow-y-auto pr-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}