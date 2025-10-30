import { Card, CardTitle, CardDescription } from '@/components/ui/card'

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="flex items-start gap-4 p-6 transition-shadow hover:shadow-lg hover:scale-[1.02] duration-200">
    <div className="text-4xl text-purple-600 shrink-0">{icon}</div>

    <div className="flex flex-col">
      <CardTitle className="text-lg font-semibold text-gray-900 p-0">
        {title}
      </CardTitle>
      <CardDescription className="text-gray-600 text-base leading-relaxed p-0">
        {description}
      </CardDescription>
    </div>
  </Card>
)
