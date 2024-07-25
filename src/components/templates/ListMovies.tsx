import { trpcServer } from '@/trpc/clients/server'
import { RouterOutputs } from '@/trpc/clients/types'
import Image from 'next/image'

export interface IListMoviesProps {}

export const ListMovies = async ({}: IListMoviesProps) => {
  const movies = await trpcServer.movies.movies.query()
  return (
    <div className="grid grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieInfo key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export const MovieInfo = ({
  movie,
}: {
  movie: RouterOutputs['movies']['movies'][0]
}) => {
  return (
    <div>
      <Image
        src={movie.posterUrl || '/default.png'}
        alt=""
        className="aspect-square object-cover rounded shadow-lg"
        width={300}
        height={300}
        priority
      />
      <div className="text-lg font-semibold">{movie.title}</div>
      <div>{movie.director}</div>
      <div className="text-xs text-gray-500 mt-2">{movie.genre}</div>
    </div>
  )
}
