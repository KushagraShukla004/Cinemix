// src/components/organisms/SearchUtils/CinemaList.tsx
import { trpcClient } from '@/trpc/clients/client'
import { Loading } from '@/components/molecules/Loading'
import { useHandleSearch } from '@/util/hooks'
import { useEffect } from 'react'

export const CinemaList = ({
  movieId,
  onCinemaSelect,
}: {
  movieId: number
  onCinemaSelect: (cinemaId: number) => void
}) => {
  const { data, isLoading, refetch } =
    trpcClient.cinemas.searchCinemasByMovie.useQuery({ movieId })

  useEffect(() => {
    refetch()
  }, [movieId, refetch])

  if (isLoading) return <Loading />

  return (
    <div className="grid grid-cols-3 gap-2">
      {data?.map((cinema) => (
        <button key={cinema.id} onClick={() => onCinemaSelect(cinema.id)}>
          <div>{cinema.name}</div>
        </button>
      ))}
    </div>
  )
}
