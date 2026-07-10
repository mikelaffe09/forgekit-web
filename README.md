# ForgeKit Web

A reusable React + TypeScript starter kit for building dashboards, SaaS apps, admin panels, client portals, landing pages, and business software faster.

## Why this exists

Most web projects repeat the same setup:

- Layouts
- Buttons
- Cards
- Tables
- Forms
- Auth pages
- Dashboard shells
- API clients
- Loading states
- Empty states
- Delete confirmations
- Settings pages
- Routing
- CI setup

ForgeKit Web is my personal starter foundation so future projects can start from a clean, reusable structure instead of starting from zero.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- Lucide React
- GitHub Actions CI

## Current Features

- Reusable landing page
- Reusable dashboard layout
- Reusable page header
- Reusable stat card
- Reusable data table
- Reusable empty state
- Reusable delete dialog
- Reusable text field
- Reusable textarea field
- Reusable resource page template
- Reusable sign-in page template
- Reusable settings page pattern
- Reusable API client
- 404 not found page
- GitHub Actions build workflow

## Pages

| Route        | Purpose                |
| ------------ | ---------------------- |
| `/`          | Landing page           |
| `/login`     | Sign-in template       |
| `/dashboard` | Dashboard starter      |
| `/users`     | Resource table example |
| `/settings`  | Settings form example  |
| `*`          | Not found page         |

## Project Structure

```txt
src/
  app/
    providers.tsx
    router.tsx

  components/
    forms/
    layout/
    shared/
    tables/
    ui/

  features/
    auth/
    dashboard/
    landing/
    not-found/
    settings/
    users/

  services/
    api-client.ts

  templates/
    resource-page.tsx

  hooks/
  routes/
  types/
```
