import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from "@/src/components/card"

export function CompanyCard({ name, slug, interviewCount, logo }) {
  if (!logo) {
    console.warn(`No logo provided for company: ${name}`);
    logo = "/placeholder-logo.png";
  }

  return (
    <Link href={`/interview-experience/${slug}`}>
      <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden bg-gray-800 border border-gray-700 h-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
        
        <CardHeader className="p-0">
          <div className="w-full h-32 sm:h-40 md:h-44 relative bg-gradient-to-br from-gray-900 to-gray-800 group-hover:from-gray-800 group-hover:to-gray-700 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              style={{ objectFit: 'contain' }}
              className="p-4 sm:p-6 md:p-8 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                console.error(`Error loading image for ${name}`);
                e.target.src = "/placeholder-logo.png";
              }}
            />
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 md:p-6 relative">
          <div className="absolute -top-4 sm:-top-5 md:-top-6 left-0 right-0 h-4 sm:h-5 md:h-6 bg-gradient-to-t from-gray-800"></div>
          
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                {name}
              </h3>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500"></span>
                <p className="text-xs sm:text-base text-gray-400 font-medium">
                  {interviewCount} interview experience{interviewCount !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:space-y-4 pt-2 sm:pt-3 border-t border-gray-700">
              <button className="relative w-36 sm:w-44 inline-flex items-center justify-center px-3 sm:px-4 py-1 sm:py-1.5 overflow-hidden font-medium text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-purple-600 hover:via-blue-600 hover:to-blue-500 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 mx-auto whitespace-nowrap">
                <span className="relative text-xs sm:text-sm">View Experiences</span>
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 ml-1 sm:ml-1.5 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <div className="flex items-center justify-end space-x-1">
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-blue-500/80"></span>
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-purple-500/80"></span>
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-pink-500/80"></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}