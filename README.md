# 👨‍🍳 Welcome to the Chef Shows App!

This repository contains the **development container setup** for running the Chef Shows App locally.

---

## 🧱 Tech Stack

- [**Remix**](https://remix.run/) — Fullstack web framework built on top of React, optimized for fast page loads and nested routing.
- [**Tailwind CSS**](https://tailwindcss.com/) — Utility-first CSS framework for rapidly building custom UIs.
- [**Prisma**](https://www.prisma.io/) — Type-safe ORM for interacting with the PostgreSQL database.
- **PostgreSQL** — Relational database used for storing show data.

---

## 🚀 Getting Started with Development

# Chef Shows App

## Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js 20 or higher
- npm 9 or higher

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=chef-shows
HOST_PORT=3000
```

## Running Locally

1. **Start the Development Environment**
   ```bash
   # Build the Docker images
   docker-compose build

   # Start the containers in detached mode
   docker-compose up -d

2. **Run Prisma migrations**
   ```bash
   # Runs the timestamped migrations under /prisma/migrations
   npm run prisma:migrate:deploy
   ```

3. **Seed the Database**
   ```bash
   # Load initial data into the database
   npm run seed-data
   ```

4. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Available Scripts

- `docker-compose build` - Builds the Docker images
- `docker-compose up -d` - Starts the containers in detached mode
- `docker-compose down` - Stops and removes the containers
- `npm run seed-data` - Seeds the database with initial data
- `npm run dev` - Starts the development server
- `npm run test` - Runs the unit test


