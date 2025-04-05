import { db } from "./firebase"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { hash } from "bcryptjs"

// This is a utility script to seed the database with initial data
export async function seedDatabase() {
  try {
    console.log("Starting database seeding process...")

    // Create schools with fixed IDs for consistency
    const school1Id = "school1"
    const school2Id = "school2"

    // Create or update schools
    await setDoc(doc(db, "schools", school1Id), {
      subdomain: "school1",
      name: "Springfield Elementary",
      description:
        "Springfield Elementary School is a vibrant learning community dedicated to fostering academic excellence and personal growth in a supportive environment.",
      contactEmail: "info@springfield.edu",
      contactPhone: "(555) 123-4567",
      address: "123 School Lane, Springfield, ST 12345",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await setDoc(doc(db, "schools", school2Id), {
      subdomain: "school2",
      name: "Riverdale High",
      description:
        "Riverdale High School prepares students for college and careers through rigorous academics, diverse extracurricular activities, and community engagement.",
      contactEmail: "info@riverdale.edu",
      contactPhone: "(555) 987-6543",
      address: "456 Education Blvd, Riverdale, ST 67890",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("Schools created/updated successfully")

    // Create admin users with fixed IDs
    const plainPassword = "password123"
    console.log("Hashing password...")
    const hashedPassword = await hash(plainPassword, 10)
    console.log("Password hashed successfully:", hashedPassword.substring(0, 10) + "...")

    await setDoc(doc(db, "users", "admin1"), {
      email: "admin@school1.com",
      password: hashedPassword,
      name: "School 1 Admin",
      schoolId: school1Id,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await setDoc(doc(db, "users", "admin2"), {
      email: "admin@school2.com",
      password: hashedPassword,
      name: "School 2 Admin",
      schoolId: school2Id,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("Admin users created/updated successfully")

    // Verify the data was written correctly
    const usersRef = collection(db, "users")
    const usersSnapshot = await getDocs(usersRef)
    console.log(`Found ${usersSnapshot.size} users in database`)

    return {
      message: "Database seeded successfully",
      schools: 2,
      users: usersSnapshot.size,
      adminEmails: ["admin@school1.com", "admin@school2.com"],
      password: plainPassword,
    }
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}

