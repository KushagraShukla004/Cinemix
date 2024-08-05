import { trpcClient } from '@/trpc/clients/client'
import { CinemaSelectCard } from './CinemaSelectCard'
import { Loading } from '@/components/molecules/Loading'

export const MovieList = ({
  onMovieSelect,
}: {
  onMovieSelect: (movieId: number) => void
}) => {
  const { data, isLoading } = trpcClient.movies.getAll.useQuery()

  if (isLoading) return <Loading />

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {data?.map((movie) => (
        <button key={movie.id} onClick={() => onMovieSelect(movie.id)}>
          <CinemaSelectCard movie={movie} />
        </button>
      ))}
    </div>
  )
}
