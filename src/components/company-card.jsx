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
      <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-[400px] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
        
        <CardHeader className="p-0">
          <div className="w-full h-44 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 group-hover:from-blue-50/30 group-hover:to-purple-50/30 dark:group-hover:from-gray-800 dark:group-hover:to-gray-700 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 dark:to-black/10"></div>
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              style={{ objectFit: 'contain' }}
              className="p-8 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                console.error(`Error loading image for ${name}`);
                e.target.src = "/placeholder-logo.png";
              }}
            />
          </div>
        </CardHeader>

        <CardContent className="p-6 relative">
          <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-gray-800"></div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                {name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                  {interviewCount} interview experience{interviewCount !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 pt-3 border-t border-gray-100 dark:border-gray-700">
              <button className="relative w-44 inline-flex items-center justify-center px-4 py-1.5 overflow-hidden font-medium text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-purple-600 hover:via-blue-600 hover:to-blue-500 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 mx-auto whitespace-nowrap">
                <span className="relative text-sm">View Experiences</span>
                <svg
                  className="w-4 h-4 ml-1.5 transform transition-transform duration-300 group-hover:translate-x-1"
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

              <div className="flex items-center justify-end space-x-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500/80"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500/80"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500/80"></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
