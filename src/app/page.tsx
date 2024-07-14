import { trpcClient } from '@/trpc/clients/client'
import { trpcServer } from '@/trpc/clients/server'

export default async function Home() {
  const movies = await trpcServer.movies.movies.query()
  return (
    <main className="bg-slate-500 p-6">
      Hello!
      <div className="bg-primary-600 text-slate-100">
        {movies.map((movie) => (
          <div key={movie.id}>
            <div>{movie.id}</div>
            <div>{movie.title}</div>
            <div>{movie.director}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
