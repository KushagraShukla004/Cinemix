import { StatCard } from '@/components/organisms/StatCard'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const dashboard = await trpcServer.managers.dashboard.query()
  return (
    <main>
      <StatCard href="/manager/cinemas" title="Cinemas">
        {dashboard.cinema}
      </StatCard>
      <StatCard href="/manager/showtimes" title="Showtimes">
        {dashboard.showtime}
      </StatCard>
    </main>
  )
}
