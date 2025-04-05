export interface School {
  id: string;
  subdomain: string
  name: string
  description: string
  contactEmail: string
  contactPhone: string
  address: string
  createdAt: any // Firestore timestamp
  updatedAt: any // Firestore timestamp
}

// Extend next-auth types
declare module "next-auth" {
  interface User {
    id: string
    schoolId: string
    role: string
  }

  interface Session {
    user: User & {
      schoolId: string
      role: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    schoolId: string
    role: string
  }
}

