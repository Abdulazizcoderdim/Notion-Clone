import { ChildProps } from '@/types'

const RootLayout = ({ children }: ChildProps) => {
  return (
    <div>
      <h1>Home</h1>
      {children}
    </div>
  )
}

export default RootLayout
