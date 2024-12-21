import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center justify-center w-full">
      <Image
        src="/vu-logo.png"
        alt="Victoria University"
        width={180}
        height={48}
        className="h-10 w-auto"
      />
    </div>
  )
}
