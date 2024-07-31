# Cinemix

Cinemix is a modern movie ticket booking app designed to provide users with a seamless experience in booking tickets for their favorite movies. Built with cutting-edge technologies, Cinemix offers a robust and interactive user interface, ensuring an enjoyable experience for all users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Scripts](#scripts)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- **User Authentication**: Secure and easy login/signup using Clerk.
- **Responsive Design**: Optimized for all devices, including mobile and desktop.
- **Interactive UI**: Built with Radix UI components for dialogs, dropdowns, and more.
- **Real-time Data**: Leveraging React Query for data fetching and state management.
- **Dynamic Theming**: Switch between light and dark themes using Next Themes.
- **Booking and Payment**: Integrated with Stripe for secure payment processing.
- **Geolocation**: Interactive maps using Mapbox GL and React Map GL.
- **Forms Handling**: Efficient form handling with React Hook Form and Zod validation.
- **Notifications**: Real-time toast notifications using Radix UI Toast.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Next.js**: React framework with server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible and unstyled components for building high-quality UIs.
- **React Hook Form**: Performant and flexible form library.
- **Lucide React**: Beautiful and consistent icon set.
- **React Query**: Powerful data synchronization and state management tool.
- **Framer Motion**: Library for animations and transitions.

### Backend

- **Prisma**: Next-generation ORM for database management.
- **tRPC**: End-to-end typesafe APIs.
- **Firebase**: Backend services including authentication and real-time databases.
- **Stripe**: Online payment processing for internet businesses.

### Dev Tools

- **TypeScript**: JavaScript with type definitions.
- **ESLint**: Linter for identifying and reporting on patterns in JavaScript.
- **Prettier**: Code formatter for maintaining consistent code style.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/KushagraShukla004/Cinemix.git
   cd cinemix
   ```
2. **Installation**:

   ```sh
   npm install
   ```

   or

   ```sh
   pnpm install
   ```

3. **Set up environment variables**: Create a .env file in the root directory and add your environment variables (e.g., API keys, database URLs).

4. **Run the development server**:
   ```sh
   npm run dev
   ```
   or
   ```sh
   pnpm dev
   ```

## Usage

- **Booking Tickets**: Users can browse available movies, select showtimes, and book tickets.

- **User Accounts**: Users can sign up, log in, and manage their bookings.

- **Payment**: Secure payment processing with Stripe integration.

**Notifications**: Users receive real-time notifications for booking confirmations and updates.

## Project Structure

```php
    ├── public
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── styles
    │   ├── utils
    │   └── ...
    ├── .eslintrc.json
    ├── .prettierrc
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── tsconfig.json
```
