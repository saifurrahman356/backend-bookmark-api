# Bookmark Management API

A simple RESTful API built with **Express.js**, **TypeScript**, and **Bun**.

This project is part of my TypeScript and backend development learning journey. It demonstrates how to build an API with Express, define TypeScript interfaces, validate incoming request data, and implement CRUD operations.

## Tech Stack

- [Bun](https://bun.sh/) – JavaScript runtime, package manager, and development tooling
- [Express.js](https://expressjs.com/) – Web framework for Node.js-compatible applications
- [TypeScript](https://www.typescriptlang.org/) – Static typing
- [Bun types](https://bun.sh/docs) – TypeScript definitions for Bun

## Features

- Create a bookmark
- Retrieve all bookmarks
- Retrieve a bookmark by ID
- Filter bookmarks by tag
- Update a bookmark using PATCH
- Delete a bookmark
- Validate incoming request data
- Return appropriate HTTP status codes

## Project Structure

```text
backend-bookmark-api/
├── src/
│   ├── index.ts       # Express application and API routes
│   └── types.ts       # Bookmark types, sample data, and validation
├── .gitignore
├── bun.lock
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

Install [Bun](https://bun.sh/) before working with this project.

Check your installed versions:

```bash
bun --version
node --version
```

If Bun is not installed on macOS, you can install it with:

```bash
brew install oven-sh/bun/bun
```

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

### 2. Navigate to the project

```bash
cd backend-bookmark-api
```

### 3. Install dependencies

```bash
bun install
```

This installs the dependencies defined in `package.json` and uses `bun.lock` to resolve the project dependencies.

## Running the Application

### Development mode

Start the development script:

```bash
bun run dev
```

The development script uses Bun's watch mode so changes to the application can be picked up while developing.

### Start the application

```bash
bun run start
```

The application listens on:

```text
http://localhost:3000
```

You can also run the entry point directly:

```bash
bun run src/index.ts
```

To stop the server, press `Ctrl + C`.

## TypeScript

### Type-check the project

```bash
bun run typecheck
```

This executes the `typecheck` script defined in `package.json`.

### TypeScript configuration

The project uses `tsconfig.json` with strict type checking enabled, including:

- `strict`
- `noUncheckedIndexedAccess`
- `noImplicitOverride`
- `noFallthroughCasesInSwitch`
- `noEmit`

## API Endpoints

Base URL:

```text
http://localhost:3000
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check whether the API is running |
| GET | `/bookmarks` | Retrieve all bookmarks |
| GET | `/bookmarks?tag=node` | Filter bookmarks by tag |
| GET | `/bookmarks/:id` | Retrieve a bookmark by ID |
| POST | `/bookmarks` | Create a bookmark |
| PATCH | `/bookmarks/:id` | Update a bookmark |
| DELETE | `/bookmarks/:id` | Delete a bookmark |

## API Examples

You can test the endpoints using [Bruno](https://www.usebruno.com/), Postman, or `curl`.

### 1. Health check

```bash
curl http://localhost:3000/
```

### 2. Get all bookmarks

```bash
curl http://localhost:3000/bookmarks
```

Example response:

```json
[
  {
    "id": 1,
    "url": "https://expressjs.com",
    "title": "Express.js",
    "tag": "node"
  },
  {
    "id": 2,
    "url": "https://typescriptlang.org",
    "title": "TypeScript",
    "tag": "typescript"
  },
  {
    "id": 3,
    "url": "https://developer.mozilla.org",
    "title": "MDN Web Docs"
  }
]
```

### 3. Filter bookmarks by tag

```bash
curl "http://localhost:3000/bookmarks?tag=node"
```

### 4. Get a bookmark by ID

```bash
curl http://localhost:3000/bookmarks/1
```

### 5. Create a bookmark

```bash
curl -X POST http://localhost:3000/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "id": 4,
    "url": "https://bun.sh",
    "title": "Bun",
    "tag": "runtime"
  }'
```

The `id`, `url`, and `title` fields are required by the current implementation. The `tag` field is optional.

### 6. Update a bookmark

Use PATCH to update one or more fields without replacing the entire bookmark.

```bash
curl -X PATCH http://localhost:3000/bookmarks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Express.js Documentation",
    "tag": "backend"
  }'
```

### 7. Delete a bookmark

```bash
curl -X DELETE http://localhost:3000/bookmarks/1
```

A successful deletion returns HTTP status `204 No Content`.

## TypeScript Concepts Practiced

This project provides practical experience with:

- Interfaces and optional properties
- Type aliases
- `Partial<T>` and `Omit<T>`
- Union types and `unknown`
- Type guards and type predicates
- Generic utility types
- Type-safe Express route handlers
- Request parameters and query parameters
- JSON request and response handling
- Input validation
- HTTP methods and status codes
- Array methods such as `find`, `findIndex`, `filter`, and `splice`

## Available Scripts

The following scripts are defined in `package.json`:

| Command | Description |
|---|---|
| `bun install` | Install project dependencies |
| `bun run dev` | Run the development script |
| `bun run start` | Run the start script |
| `bun run typecheck` | Run TypeScript type checking |

## Important Notes

- Bookmark data is currently stored in an in-memory array. It is reset to the initial sample data whenever the server restarts.
- This project does not currently use a database.
- The API expects JSON request bodies for POST and PATCH requests.
- The server currently uses port `3000`, configured in `src/index.ts`.
- This is a learning project and is not yet configured for production deployment.

## Future Improvements

- Add persistent storage using a database such as PostgreSQL or MongoDB.
- Add automated tests with Bun's test runner.
- Add environment-based configuration for the server port.
- Add centralized error handling.
- Add request validation with a schema validation library.
- Add API documentation using OpenAPI / Swagger.
- Add authentication and authorization.

## License

This project is intended for learning and personal development.
