import SlidesPresenter from "@/components/SlidesPresenter"
import { readdirSync } from "fs"
import { Suspense } from "react"

const images = readdirSync("public/slides").map((file) => `/slides/${file}`)

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-zinc-900">
      <div className="max-w-[calc(90vw)] w-[1280px] aspect-[16/10] relative shadow-2xl rounded-[10px]">
        <Suspense fallback={<div>Loading...</div>}>
          <SlidesPresenter images={images} />
        </Suspense>
      </div>
    </main>
  )
}
