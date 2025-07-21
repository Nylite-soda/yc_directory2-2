# YC Directory - Full Application Documentation

## 1. Introduction

This document provides a comprehensive technical overview of the YC Directory application. Its purpose is to serve as a guide for developers, explaining the project's architecture, file structure, core features, and implementation details.

---

## 2. Project Architecture

The application is a modern full-stack web application built on a Jamstack architecture. It is composed of three primary layers:

1.  **Frontend (Next.js):** A React framework that handles server-side rendering (SSR), static site generation (SSG), and all client-side logic. It is responsible for the entire user interface.
2.  **Headless CMS (Sanity.io):** A flexible content backend that stores all startup data, user profiles (authors), and other content. It is decoupled from the frontend, and data is accessed via its API.
3.  **Authentication (NextAuth.js):** An authentication library that integrates directly with Next.js to provide secure, session-based user authentication using various OAuth providers.

This architecture allows for a highly performant, scalable, and maintainable application.

---

## 3. File Structure Deep Dive

The project uses a logical and feature-oriented file structure.

### `app/`

This directory contains all the routes and core layout files for the application, following the Next.js App Router conventions.

-   `layout.tsx`: The root layout for the entire application. It sets up the HTML shell, applies the global font (`Work Sans`), and wraps all pages in the `LoadingProvider`.
-   `globals.css`: The global stylesheet. It imports Tailwind CSS and defines custom utility classes and base styles used throughout the application.
-   `loading.tsx`: A Next.js convention that provides an instant, server-rendered loading UI for initial page loads and during route transitions.
-   **(root)/**: A route group that organizes the main pages of the application.
    -   `page.tsx`: The homepage. It fetches and displays all startups and includes the main search form.
    -   `startup/[id]/page.tsx`: The dynamic route for displaying the details of a single startup.
    -   `user/[id]/page.tsx`: The dynamic route for a user's public profile.
    -   `startup/create/page.tsx`: The page for submitting a new startup, protected to only allow authenticated users.
-   `api/auth/[...nextauth]/route.ts`: The catch-all API route that handles all NextAuth.js authentication requests (e.g., sign-in, sign-out, session management).

### `components/`

This directory contains all the React components used to build the UI.

-   `ui/`: Contains small, reusable, and generic UI components, often adapted from `shadcn/ui`.
    -   `ImagePlaceholder.tsx`: A custom component to display a styled placeholder when an image is missing.
    -   `EmptyState.tsx`: A custom component to display a message when content is not available.
-   `StartupCard.tsx`: The core component for displaying a single startup in the grid. It is carefully structured to be responsive and handle varying content lengths gracefully.
-   `StartupForm.tsx`: The client component for creating a new startup. It uses the `useActionState` hook to manage form state and validation.
-   `Navbar.tsx`: The main navigation bar, which dynamically changes to show login/logout buttons and the user's avatar based on the authentication state.
-   `LoadingScreen.tsx`: Provides the global loading state context (`LoadingProvider`) and the loading screen overlay.
-   `LoadingLink.tsx`: A custom wrapper around the Next.js `<Link>` component that triggers the global loading screen on navigation.

### `lib/`

This directory contains the application's core logic, utility functions, and type definitions.

-   `actions.ts`: Contains all Server Actions. The `createPitch` action handles the startup form submission, including server-side validation and writing data to Sanity.
-   `validation.ts`: Defines the Zod schema (`formSchema`) for validating the startup submission form.
-   `utils.ts`: Contains utility functions, such as `formatDate`.
-   `types.ts`: Defines custom TypeScript types used in the application, such as the `FormState` for the startup form.

### `sanity/`

This directory contains all the configuration and code related to the Sanity.io integration.

-   `schemaTypes/`: Defines the content model for the database (e.g., `startup.ts`, `author.ts`).
-   `lib/client.ts`: Configures and exports the Sanity client for fetching data.
-   `lib/queries.ts`: Contains all the GROQ queries used to fetch data from Sanity.
-   `types.ts`: An auto-generated file containing TypeScript types that match the Sanity schema.

---

## 4. Core Feature Walkthroughs

### Authentication Flow

1.  **Configuration:** NextAuth.js is configured in `app/api/auth/[...nextauth]/route.ts` with an OAuth provider (e.g., Google).
2.  **Session Access:** The `auth()` function from `next-auth` is used in server components (like `Navbar.tsx`) to access the user's session.
3.  **Protected Routes:** The "Create Startup" page (`app/(root)/startup/create/page.tsx`) checks for a valid session and redirects unauthenticated users to the homepage.
4.  **UI Changes:** The `Navbar` component uses the session data to conditionally render either a "Login" button or a "Logout" button and the user's profile avatar.

### Data Fetching & Search

1.  **GROQ Queries:** All data fetching is done using GROQ queries defined in `sanity/lib/queries.ts`.
2.  **Partial-Match Search:** The `STARTUPS_QUERY` uses the `match` operator to perform a case-insensitive, partial search.
3.  **Wildcards:** On the homepage (`app/(root)/page.tsx`), the search term is wrapped in wildcards (`*${query}*`) before being passed to the query, enabling the "contains" search behavior.
4.  **Conditional Filtering:** The query is structured to only apply the search filter if a search term is provided, ensuring all startups are returned when the search is empty.

### Form Submission with Server Actions

1.  **Client Component (`StartupForm.tsx`):**
    -   The `useActionState` hook is used to manage the form's entire lifecycle (initial, pending, success, error).
    -   A `FormState` type is used to define the shape of the state, ensuring type safety.
    -   The `formAction` is passed directly to the `<form>` element's `action` prop.
    -   The UI updates based on the `state` and `isPending` values returned by the hook.
2.  **Server Action (`lib/actions.ts`):**
    -   The `createPitch` function receives the previous state and the form data.
    -   It first checks for an authenticated session.
    -   It then validates the form data against the Zod schema (`formSchema`). If validation fails, it returns an error state with detailed field errors.
    -   If validation succeeds, it creates a new startup document in Sanity and returns a success state, including the new startup's `_id`.

### Responsive Design Strategy

1.  **Fluid Grid:** The primary card layout (`.card_grid`) uses `grid-cols-[repeat(auto-fit,minmax(300px,1fr))]`. This modern CSS Grid technique creates a fully fluid grid that automatically adjusts the number of columns based on the available screen width, without needing traditional breakpoints.
2.  **Minimum Width:** The `minmax(300px, ...)` function ensures that the cards will never become narrower than 300px, preventing them from looking "muddled" on small screens.
3.  **Overflow Prevention:**
    -   The `.startup-card` class has `min-w-0` to allow it to shrink correctly within the grid.
    -   The `.section_container` has `overflow-hidden` to act as a safeguard against any child elements breaking the layout.
4.  **Mobile-First Styles:** Most custom utility classes are designed mobile-first, with responsive prefixes (`sm:`, `md:`) used to scale up padding, font sizes, and other properties for larger screens.

---

## 5. Styling and Theming

-   **Tailwind CSS:** The project uses Tailwind CSS for all its styling. The configuration is in `tailwind.config.js`.
-   **`globals.css`:** This file is used for:
    -   Importing Tailwind's base styles.
    -   Defining a small number of custom utility classes (e.g., `.heading`, `.pink_container`) to encapsulate frequently used style combinations.
    -   Applying styles to the `.prose` class for rendering Markdown content.
-   **Component-Based Styling:** The vast majority of styles are applied directly in the JSX of the components using Tailwind's utility classes, keeping the styling co-located with the markup.
