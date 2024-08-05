'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'

import { format } from 'date-fns'

import { Button } from '../atoms/button'
import { storage } from '@/util/config/firebase'
import { useAuth } from '@clerk/nextjs'
import { trpcClient } from '@/trpc/clients/client'
import { Loading } from '../molecules/Loading'
import { RouterOutputs } from '@/trpc/clients/types'
import { SimpleDialog } from '../organisms/SimpleDialog'
import { SeatNumber } from '../organisms/SearchUtils/SeatNumber'

export interface ITicketsProps {}

async function getImageUrl(path: string): Promise<string> {
  // Create a reference to the file
  const fileRef = ref(storage, path)

  // Get the download URL
  const url = await getDownloadURL(fileRef)

  return url
}

export const TicketMovie = ({
  ticket,
}: {
  ticket: RouterOutputs['tickets']['myTickets'][0]
}) => {
  const [open, setOpen] = useState(false)
  const posterUrl = ticket.Bookings[0].Showtime.Movie.posterUrl || '/film.png'

  return (
    <div
      key={ticket.id}
      className="relative p-6 overflow-hidden rounded-lg"
      style={{
        backgroundImage: `url(${posterUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10 p-4 bg-white/90 rounded-lg backdrop-filter backdrop-blur-md">
        <SimpleDialog open={open} setOpen={setOpen} title={'QR Code'}>
          <QRCode url={ticket.qrCode || ''} />
        </SimpleDialog>
        <div className="flex gap-6">
          <Image
            width={200}
            height={200}
            className="rounded"
            src={posterUrl}
            alt={ticket.Bookings[0].Showtime.Movie.title}
          />
          <div>
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-lg font-semibold">
                  {ticket.Bookings[0].Showtime.Movie.title}
                </div>
                <div>{ticket.Bookings[0].Showtime.Screen.Cinema.name}</div>
              </div>
              <div className="flex flex-col items-center p-1 mb-5 border rounded">
                <div className="text-xs">Screen</div>
                <div className="text-xl font-bold">
                  {ticket.Bookings[0].Showtime.Screen.number}
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold">
                {format(new Date(ticket.Bookings[0].Showtime.startTime), 'p')}
              </div>
              <div className="text-xs">
                {format(new Date(ticket.Bookings[0].Showtime.startTime), 'PP')}
              </div>
            </div>
            <div className="mt-4">
              <div>Seats</div>
              <div className="flex flex-wrap gap-2 ">
                {ticket.Bookings.map((booking) => (
                  <SeatNumber
                    key={booking.id}
                    column={booking.column}
                    row={booking.row}
                  />
                ))}
              </div>
            </div>
            <Button
              variant="default"
              className="mt-4"
              size="sm"
              onClick={() => setOpen(true)}
            >
              View QR code
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Tickets = ({}: ITicketsProps) => {
  const { userId } = useAuth()
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(6)
  const { data, isLoading } = trpcClient.tickets.myTickets.useQuery()

  const [open, setOpen] = useState(false)

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col space-y-5">
      {data?.map((ticket) => <TicketMovie key={ticket.id} ticket={ticket} />)}
    </div>
  )
}

export const QRCode = ({ url }: { url: string }) => {
  const [picUrl, setPicUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchImageUrl() {
      setLoading(true)
      const imageUrl = await getImageUrl(url)
      setLoading(false)
      setPicUrl(imageUrl)
    }

    fetchImageUrl()
  }, [url])

  if (loading) return <Loading />

  return <Image width={200} height={200} src={picUrl || ''} alt={'ticket'} />
}
