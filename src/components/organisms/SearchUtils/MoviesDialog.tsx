'use client'
import { useState } from 'react'
import { SimpleDialog } from '../SimpleDialog'
import { MovieList } from './MovieList'
import { CinemaList } from './CinemaList'
import { ShowtimeList } from './ShowtimeList'
import { SelectSeats } from './SelectSeats' // Import SelectSeats

export const MoviesDialog = () => {
  const [selectedMovie, setSelectedMovie] = useState<number | undefined>()
  const [selectedCinema, setSelectedCinema] = useState<number | null>(null)
  const [selectedShowtime, setSelectedShowtime] = useState<number | null>(null)
  const [screenId, setScreenId] = useState<number | null>(null) // State for screenId
  const [openDialog, setOpenDialog] = useState(false) // Start with false

  const handleMovieSelect = (movieId: number) => {
    setSelectedMovie(movieId)
    setOpenDialog(true) // Open the dialog when a movie is selected
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedCinema(null)
    setSelectedShowtime(null)
    setScreenId(null) // Reset screenId when closing the dialog
  }

  return (
    <div className="space-y-8">
      {/* Movie list shown directly on the page */}
      <MovieList onMovieSelect={handleMovieSelect} />

      {/* Dialog box shown only after a movie is selected */}
      {selectedMovie !== undefined && (
        <SimpleDialog
          title="Book Your Movie"
          open={openDialog}
          setOpen={handleCloseDialog} // Use the close handler
        >
          <div className="space-y-8">
            {!selectedCinema && (
              <CinemaList
                movieId={selectedMovie}
                onCinemaSelect={setSelectedCinema}
              />
            )}
            {selectedCinema !== null && !selectedShowtime && (
              <ShowtimeList
                cinemaId={selectedCinema}
                movieId={selectedMovie}
                onShowtimeSelect={(showtimeId, screenId) => {
                  setSelectedShowtime(showtimeId)
                  setScreenId(screenId) // Update screenId when a showtime is selected
                }}
              />
            )}
            {/* Show seat selection after a showtime is selected */}
            {selectedShowtime !== null && screenId && (
              <SelectSeats
                showtimeId={selectedShowtime}
                screenId={screenId} // Pass the screenId
              />
            )}
          </div>
        </SimpleDialog>
      )}
    </div>
  )
}
