import Link from "next/link"
import type { School } from "@/types"

interface SchoolHeaderProps {
  school: School
}

export function SchoolHeader({ school }: SchoolHeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{school.name}</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-sm font-medium hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" className="text-sm font-medium hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-sm font-medium hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

