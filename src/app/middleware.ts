// The clerkMiddleware helper enables authentication and is where you'll configure your protected routes.

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
//because we are going to make our own auth system so the api/trpc must accessible to both logged-in and logged-out users.Hence, (api|trpc)(.*)
const isProtectedRoute = createRouteMatcher(['/', '/(api|trpc)(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()
  }
})

export const config = {
  //protects all routes including api/trpc
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
