# Document Management System

A NestJS-based document management system with authentication, templates, and document handling capabilities.

## Architecture

This application follows a modular architecture based on NestJS:

- **API Layer**: RESTful endpoints for client interactions
- **Service Layer**: Business logic implementation
- **Repository Layer**: Data access using TypeORM
- **Authentication**: JWT-based authentication with refresh token rotation
- **Caching**: Redis-based caching for performance optimization

## Tech Stack

- **Backend Framework**: NestJS v10
- **Database**: PostgreSQL with TypeORM as ORM
- **Caching/Session**: Redis with ioredis client
- **Authentication**: JWT with @nestjs/jwt
- **Validation**: class-validator and class-transformer
- **API Security**: bcrypt for password hashing
- **Development**: TypeScript, ESLint, Prettier

## Key Features

- User authentication with JWT tokens
- Document management (CRUD operations)
- Template system for documents
- Role-based access control
- Session management with Redis
- Refresh token rotation with Redis storage
- Data validation and transformation

## Development Setup

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- Redis
- Docker and Docker Compose (optional)

### Environment Configuration

1. Copy the environment example file:

   ```bash
   cp .env.example .env
   ```

2. Configure your `.env` file with appropriate values

### Running with Docker

Start the required services (PostgreSQL and Redis):

```bash
docker-compose up -d
```

### Local Development

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start the development server:

   ```bash
   yarn start:dev
   ```

   or

   ```bash
   yarn start:debug
   ```

## API Documentation

The API includes the following main resources:

- `/auth` - Authentication endpoints (login, refresh, logout)
- `/users` - User management
- `/documents` - Document CRUD operations
- `/templates` - Document template management

Detailed API documentation is available when running the server at `/api/docs` (if Swagger is configured).

## Code Quality

This project uses:

- ESLint for static code analysis
- Prettier for code formatting
- Husky for Git hooks
- lint-staged for pre-commit validation

Pre-commit hooks automatically run linting and formatting on staged files.

## Project Structure

```
src/
├── auth/             # Authentication module
├── common/           # Shared utilities, guards, decorators
├── config/           # Configuration modules
├── documents/        # Document management module
├── templates/        # Template management module
├── users/            # User management module
└── main.ts           # Application entry point
```
