import Image from "next/image";

export default function FacultyCard({person}) {
    return (
        <div className="flex justify-center items-center m-4">
            <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl 
                shadow-lg transition-all duration-300 ease-in-out
                hover:shadow-yellow-500/50 hover:shadow-xl">
                <div className="p-4 flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-3 rounded-full overflow-hidden ring-2 ring-yellow-600/30 
                        hover:ring-yellow-500/50 transition-all duration-300">
                        <Image
                            src={person.src}
                            alt={person.name}
                            fill
                            className="object-cover rounded-full"
                            sizes="(max-width: 128px) 100vw, 128px"
                        />
                    </div>
                    
                    <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                        from-yellow-200 to-yellow-400 mb-2 text-center">
                        {person.name}
                    </h1>
                    
                    <div className="flex flex-col space-y-2 w-full">
                        <p className="text-yellow-500 text-sm font-medium text-center">
                            {person.desc}
                        </p>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/80 to-gray-900 w-full h-1"></div>
                        </div>
                        
                       
                        <div className="h-24 overflow-y-auto overflow-x-hidden scrollbar-hide">
                            <p className="text-gray-300 text-sm leading-relaxed text-center 
                                px-2 py-2 bg-yellow-900/10 rounded-lg border border-yellow-500/10 ">
                                {person.info}
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <a 
                            href={person.url}
                            className="group inline-flex items-center gap-2 px-4 py-1.5 
                                bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 
                                hover:from-yellow-600/30 hover:to-yellow-500/30
                                border border-yellow-500/30 hover:border-yellow-400/50
                                rounded-full transition-all duration-300
                                text-yellow-200 hover:text-yellow-100
                                shadow-lg hover:shadow-yellow-500/20"
                        >
                            <span className="text-sm font-medium">View Profile</span>
                            <svg 
                                className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}