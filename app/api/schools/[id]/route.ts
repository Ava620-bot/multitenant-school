import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get school by ID
    const schoolRef = doc(db, "schools", params.id)
    const schoolSnap = await getDoc(schoolRef)

    if (!schoolSnap.exists()) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    // Check if user has access to this school
    if (session.user.role !== "admin" && session.user.schoolId !== params.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const school = {
      id: schoolSnap.id,
      ...schoolSnap.data(),
    }

    return NextResponse.json({ school })
  } catch (error) {
    console.error("Error fetching school:", error)
    return NextResponse.json({ error: "Failed to fetch school" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user has access to this school
    if (session.user.role !== "admin" && session.user.schoolId !== params.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.json()

    // Validate data
    const { name, description, contactEmail, contactPhone, address } = data

    if (!name || !description || !contactEmail || !contactPhone || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update school
    const schoolRef = doc(db, "schools", params.id)
    await updateDoc(schoolRef, {
      name,
      description,
      contactEmail,
      contactPhone,
      address,
      updatedAt: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating school:", error)
    return NextResponse.json({ error: "Failed to update school" }, { status: 500 })
  }
}

