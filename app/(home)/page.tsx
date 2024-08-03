import { Clients, Heroes } from './components'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-6 pb-10 md:justify-start text-center gap-y-8 flex-1">
      <Heroes />
      <Clients/>
    </div>
  )
}
