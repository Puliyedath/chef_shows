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

To run the application locally in development mode:

1. **Build and start the containers:**

   ```bash
   docker-compose build
   docker-compose up -d
```

 2. **Seed the Database:**

 After the database is up and running, execute

 ```bash
 # This add the tv show records from the kaggle dataset
 npm run seed-data
 ```

3. **View the App:**

Navigate to localhost:3000




