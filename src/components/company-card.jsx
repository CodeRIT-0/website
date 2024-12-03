import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from "@/src/components/card"

export function CompanyCard({ name, slug, interviewCount, logo }) {
  if (!logo) {
    console.warn(`No logo provided for company: ${name}`);
    // Provide a fallback image or placeholder
    logo = "/placeholder-logo.png";
  }

  return (
    <Link href={`/interview-experience/${slug}`}>
      <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
        <CardHeader className="p-0">
          <div className="w-full h-48 relative bg-gray-50 dark:bg-gray-900">
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              style={{ objectFit: 'contain' }}
              className="p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                console.error(`Error loading image for ${name}`);
                e.target.src = "/placeholder-logo.png";
              }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {name}
          </h3>
          <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
            {interviewCount} interview{interviewCount !== 1 ? 's' : ''} available
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
