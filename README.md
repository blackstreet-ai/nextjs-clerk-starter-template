# Next.js Clerk Authentication Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that integrates [Clerk](https://clerk.com/) for authentication and user management.

## Features

- **Next.js App Router**: Modern routing system for Next.js applications
- **Clerk Authentication**: Secure authentication with sign-in and sign-up functionality
- **Dashboard Layout**: Clean dashboard interface with authentication controls
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- A Clerk account (for authentication)

### Environment Setup

Create a `.env.local` file with your Clerk API keys:

```
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Running the Development Server

```bash
npm run dev
# or with a custom port
npm run dev -- -p 3001
```

Open [http://localhost:3000](http://localhost:3000) (or your custom port) with your browser to see the result.

### Project Structure

- `/app`: Contains all pages and layouts using the Next.js App Router
- `/components`: Reusable UI components
- `/middleware.ts`: Handles authentication routes and protection

## Authentication Flow

The application uses Clerk for authentication with the following flow:

1. Users can sign up or sign in via the dashboard page
2. Authentication is handled through modal dialogs
3. Protected routes (like `/dashboard`) require authentication
4. Unauthenticated users are redirected to the sign-in page

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [Clerk](https://clerk.com) - Authentication and user management
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Clerk Documentation](https://clerk.com/docs) - Learn about Clerk authentication
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS

## Deployment

This application can be deployed on [Vercel](https://vercel.com) or any other hosting platform that supports Next.js applications.
