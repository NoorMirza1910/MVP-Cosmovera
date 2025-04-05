import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
}

export default function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Link href={href} className="transition-transform hover:scale-105">
      <Card className="h-full border-2 border-slate-100 hover:border-rose-200 group">
        <CardHeader className="flex flex-col items-center pb-2">
          <div className="rounded-full p-3 bg-slate-50 group-hover:bg-rose-50 transition-colors">{icon}</div>
          <h3 className="text-xl font-bold mt-4 text-slate-900">{title}</h3>
        </CardHeader>
        <CardContent className="text-center text-slate-500">{description}</CardContent>
      </Card>
    </Link>
  )
}

