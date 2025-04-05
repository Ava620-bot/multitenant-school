import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function GET() {
  try {
    // Check if schools and users exist
    const schoolsRef = collection(db, "schools")
    const schoolsSnapshot = await getDocs(schoolsRef)

    const usersRef = collection(db, "users")
    const usersSnapshot = await getDocs(usersRef)

    // Get some sample data for debugging
    const schoolsData = schoolsSnapshot.docs.map((doc) => ({
      id: doc.id,
      subdomain: doc.data().subdomain,
    }))

    const usersData = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      email: doc.data().email,
      schoolId: doc.data().schoolId,
      // Don't include password hash in response
    }))

    return NextResponse.json({
      success: true,
      schools: schoolsSnapshot.size,
      users: usersSnapshot.size,
      schoolsData,
      usersData,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error checking database:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    } else {
      console.error("Unknown error checking database:", error)
      return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 })
    }
  }
}

