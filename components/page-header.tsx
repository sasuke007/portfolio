interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">{title}</h1>
      <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">{description}</p>
    </div>
  )
}
