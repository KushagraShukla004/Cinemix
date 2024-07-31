import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'

export default function Page() {
  return (
    <main>
      <div className="flex flex-col gap-4 items-center mt-24">
        <Image
          alt=""
          width={600}
          height={600}
          src="/default.png"
          className="w-full max-w-2xl rounded-lg shadow-lg shadow-black/20 border-4 border-black aspect-square object-cover object-bottom "
        />

        <div className=" flex flex-col  items-center justify-center space-y-2 font-black  -m-40">
          <div className="flex flex-col items-center p-12">
            <div className="z-10 inline-block text-8xl text-slate-50">
              Cinemix
            </div>
            <Link
              href="/cinemas"
              className="z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium underline underline-offset-4"
            >
              <Search /> Search movies now
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
