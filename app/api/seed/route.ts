import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed"

export async function GET() {
  try {
    const result = await seedDatabase()
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error("Error seeding database:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to seed database", message: errorMessage }, { status: 500 })
  }
}

