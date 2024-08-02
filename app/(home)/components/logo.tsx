import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Image
        src={'/logo.svg'}
        alt="logo"
        width={50}
        height={50}
        className="object-cover"
      />
      <p className='font-semibold text-xl'>Notion</p>
    </div>
  )
}
