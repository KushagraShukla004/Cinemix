import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/db/prisma'
import { NextResponse } from 'next/server'
//here we have created a WebhookEvent which will get our http request from the ngrok custom domain
export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json()
  //after fetching the data via payload we are now creating and storing new user data in Prisma Schema
  if (payload.type === 'user.created') {
    const { id, first_name, last_name, image_url } = payload.data
    try {
      await prisma.user.create({
        data: {
          id,
          name: `${first_name} ${last_name}`,
          image: image_url,
        },
      })
      return NextResponse.json({ status: 'success' })
    } catch (error) {
      //if it fails then show error
      console.error('Error creating user:', error)
      return NextResponse.json(
        { status: 'error', message: 'Failed to create user' },
        { status: 500 },
      )
    }
    //if clerk webhook sends anyother webhook event other than success or failure then return unsupported
  } else {
    return NextResponse.json({ status: 'unsupported' })
  }
}
