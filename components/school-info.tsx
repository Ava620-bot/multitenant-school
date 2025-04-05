import type { School } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"

interface SchoolInfoProps {
  school: School
}

export function SchoolInfo({ school }: SchoolInfoProps) {
  return (
    <div className="space-y-8">
      <section id="about" className="space-y-4">
        <h2 className="text-3xl font-bold">About Our School</h2>
        <p className="text-lg text-muted-foreground">{school.description}</p>
      </section>

      <section id="contact" className="space-y-4">
        <h2 className="text-3xl font-bold">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{school.address}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href={`mailto:${school.contactEmail}`} className="hover:underline">
                {school.contactEmail}
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href={`tel:${school.contactPhone}`} className="hover:underline">
                {school.contactPhone}
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

