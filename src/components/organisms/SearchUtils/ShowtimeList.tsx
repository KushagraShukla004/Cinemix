import { trpcClient } from '@/trpc/clients/client'
import { Loading } from '@/components/molecules/Loading'
import { ShowtimeSelectCard } from './ShowtimeSelectedCard'

export const ShowtimeList = ({
  cinemaId,
  movieId,
  onShowtimeSelect,
}: {
  cinemaId: number
  movieId: number
  onShowtimeSelect: (showtimeId: number, screenId: number) => void // Accept screenId
}) => {
  const { data, isLoading } = trpcClient.showtimes.showtimesPerCinema.useQuery({
    cinemaId,
    movieId,
  })

  if (isLoading) return <Loading />

  return (
    <div className="flex flex-col gap-4">
      {data?.map((date) => (
        <div key={date.date} className="w-full">
          <div className="mb-2 text-lg font-semibold">{date.date}</div>
          <div className="grid grid-cols-3 gap-2">
            {date.showtimes.map((showtime) => (
              <button
                key={showtime.id}
                onClick={() => onShowtimeSelect(showtime.id, showtime.screenId)} // Pass screenId
              >
                <ShowtimeSelectCard showtime={showtime} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
