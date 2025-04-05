import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { AdminDashboard } from "@/components/admin-dashboard"
import { School } from "@/types"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  // Get the school data for this admin
  const schoolId = session.user.schoolId
  const schoolRef = doc(db, "schools", schoolId)
  const schoolSnap = await getDoc(schoolRef)

  if (!schoolSnap.exists()) {
    // Handle case where school doesn't exist
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">School Not Found</h1>
        <p>The school associated with your account could not be found.</p>
      </div>
    )
  }
  const data = schoolSnap.data()
  const school = {
    id: schoolSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString() ?? null,
    updatedAt: data.updatedAt?.toDate().toISOString() ?? null,
  } as School
  

  return <AdminDashboard school={school} />
}

