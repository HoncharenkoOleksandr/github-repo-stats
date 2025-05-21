# GitHub Projects CRM System

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

A comprehensive CRM system for managing public GitHub projects with user authentication and repository tracking.

## Features

- 🔐 User authentication (signup/login)
- 📊 GitHub repository management
- 🔄 Automatic data refresh from GitHub
- 🚀 Dockerized deployment
- 📱 Responsive UI

## Technology Stack

### Frontend
- React.js with TypeScript
- Vite build tool

### Backend
- NestJS framework
- TypeScript
- JWT authentication
- PostgreSQL database

### Infrastructure
- Docker containers
- Docker Compose orchestration

## Getting Started

### Prerequisites

- Docker (v20.10+)
- Docker Compose (v2.0+)
- Node.js (v18+)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>

2. Create .env file in backend folder with and in root folder:
  ```env
  # PostgreSQL settings
  POSTGRES_HOST=
  POSTGRES_PORT=
  POSTGRES_USER=
  POSTGRES_PASSWORD=
  POSTGRES_DB=
  
  # Authentication settings
  SECRET_KEY=SECRET_KEY
  JWT_EXPIRES_IN=1d
```
API Endpoints
Authentication
POST /auth/login - User login

POST /auth/signup - User registration

Users
GET /users/me - Get current user profile

Repositories
POST /repo - Add new repository

GET /repo - List all repositories

DELETE /repo/{id} - Delete repository

PATCH /repo/{id}/refresh - Refresh repository data

