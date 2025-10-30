type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center gap-4">
      <div className="text-4xl shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  </div>
)
