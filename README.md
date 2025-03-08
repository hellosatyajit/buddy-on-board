# Buddy On Board

A two-sided marketplace platform connecting travelers with verified service providers.

## Project Structure

├── public/
├── src/
│ ├── actions/
│ │ ├── airport.ts
│ │ ├── auth.ts
│ │ ├── chat.ts
│ │ ├── notification.ts
│ │ └── queue.ts
│ ├── app/
│ │ ├── (auth)/ 
│ │ │ ├── forgot-password/
│ │ │ ├── login/
│ │ │ ├── onboarding/
│ │ │ ├── reset-password/
│ │ │ └── signup/
│ │ ├── (company)/
│ │ │ ├── privacy-policy/
│ │ │ └── terms-of-service/
│ │ ├── (support)/
│ │ │ ├── help/
│ │ │ ├── report-issue/
│ │ │ └── request-feature/
│ │ ├── (user)/
│ │ │ ├── booking/
│ │ │ │ ├── [type]/
│ │ │ │ ├── canceled/
│ │ │ │ └── rate/
│ │ │ └── chat/
│ │ │ └── [id]/
│ │ └── layout.tsx
│ ├── components/
│ ├── db/
│ ├── hooks/
│ ├── lib/
│ ├── stores/
│ ├── styles/
│ ├── types/
│ └── utils/
├── supabase/
│ ├── functions/
│ │ └── process-email-queue/
│ └── migrations/
├── .env.example
├── .env.local
└── package.json

## Folder Structure Explanation

- `src/actions/`: Server actions
- `src/app/`: Next.js App Router
- `src/app/(auth)/`: Authentication pages
- `src/app/(company)/`: Company pages
- `src/app/(support)/`: Support pages
- `src/app/(user)/`: User pages (behind auth)
- `src/components/`: React components
- `src/db/`: Drizzle ORM
- `src/hooks/`: React hooks
- `src/lib/`: Utility functions
- `src/stores/`: React stores
- `src/types/`: TypeScript types
- `src/utils/`: Utility functions
- `supabase/`: Supabase configuration (WIP)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

## Tech Stack

- Frontend: Next.js 15 with App Router
- Backend: Next.js Server Actions
- Database: Supabase (PostgreSQL) with Drizzle
- Authentication: Supabase Auth
- Real-time Features: Supabase Realtime
- Email: Resend
- Identity Verification: Veriff
- Payments: Stripe