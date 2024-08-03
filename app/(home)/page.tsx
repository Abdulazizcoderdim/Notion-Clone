import { Clients, Heroes, Pricing } from './components'

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center px-6 pb-10 md:justify-start text-center gap-y-8 flex-1">
        <Heroes />
        <Clients />
      </div>
      <Pricing />
    </div>
  )
}
