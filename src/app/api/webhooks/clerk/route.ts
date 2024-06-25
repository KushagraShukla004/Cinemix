import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json()
  if (payload.type === 'user.created') {
    const { id, first_name, last_name, image_url } = payload.data
    try {
    } catch (error) {}
  }
}
