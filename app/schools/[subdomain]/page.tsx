import { notFound } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { SchoolHeader } from "@/components/school-header"
import { SchoolInfo } from "@/components/school-info"
import { School } from "@/types"

interface SchoolPageProps {
  params: {
    subdomain: string
  }
}

async function getSchoolBySubdomain(subdomain: string) {
  try {
    const schoolsRef = collection(db, "schools")
    const q = query(schoolsRef, where("subdomain", "==", subdomain))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const schoolData = querySnapshot.docs[0].data()
    return {
      id: querySnapshot.docs[0].id,
      ...schoolData,
    }
  } catch (error) {
    console.error("Error fetching school:", error)
    return null
  }
}

export default async function SchoolPage({ params }: SchoolPageProps) {
  const { subdomain } = (await params);
  const school = await getSchoolBySubdomain(subdomain) as School;  

  if (!school) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SchoolHeader school={school} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <SchoolInfo school={school} />
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} {school.name}
      </footer>
    </div>
  )
}

