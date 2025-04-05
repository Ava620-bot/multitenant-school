import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">School Profile Platform</h1>
          <p className="text-xl text-muted-foreground">
            A multi-tenant application for schools to showcase their information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/login">Admin Login</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="http://school1.localhost:3000">View Demo School</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} School Profile App
      </footer>
    </div>
  )
}

