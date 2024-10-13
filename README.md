# Steam Game Review Search Application

The application is designed to search for games in the Steam store and show relevant ratings from players who have spent more hours playing. After logging in, users can save their favorite games to a list on their profile.

The application follows the "clean architecture" approach and is organized into different layers: Presentation layer, Business layer, Persistence layer, and Database layer.

The core of the app is built with NextJS, using the app router. For authentication, it uses Next-auth version 5. The PostgreSQL database is managed with Prisma and its client. Some results from the Steam API are cached in a Redis database, and these endpoints are also protected by a rate limiter. The app is styled with TailwindCSS and a few components from Shadcn.

The main focus of the implementation was on functionality and architecture, not on design or visual appearance.

## Technologies

- **Next.js** (with App Router)
- **NextAuth.js** (v5 for authentication)
- **Prisma** (for PostgreSQL database management)
- **Postgres** (for auth and saving user preferences)
- **Redis** (for caching some Steam API results)
- **TailwindCSS** (for styling)
- **Shadcn** (for UI components)

## Development Setup

To get the application running locally, follow these steps:

### 1. Clone the repository

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the environment

Create a .env file in the root directory and fill in the required environment variables such as database connection strings, Redis config, and GitHub OAuth keys. You can refer to .env.example for the required variables.

### 4. Database setup

Make sure you have PostgreSQL and Redis databases running. Update your .env file with the correct connection details:

PostgreSQL: Connection string for your Postgres instance
Redis: Redis host and port

### 5. GitHub OAuth setup

To enable GitHub login, set up GitHub OAuth by creating an OAuth app in GitHub Developer Settings. After setting it up, add the following keys to your .env file:

```makefile
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
```

### 6. Start the development server

Once everything is set up, run the following command to start the development server:

```bash
npm run dev
```

The application should now be running at http://localhost:3000.
