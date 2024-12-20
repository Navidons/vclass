import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/vu-logo.png"
        alt="Victoria University"
        width={150}
        height={40}
        className="h-8 w-auto"
      />
    </div>
  )
}

