# Echo: SaaS Task Management System

Echo is a high-performance, production-ready SaaS Task Management System built with Node.js, TypeScript, Express, MongoDB (Mongoose), and Redis. 

The project strictly adheres to **Clean Architecture** and **Domain-Driven Design (DDD)** principles to separate core business rules from external frameworks, databases, and delivery mechanisms.

---

## 🏗️ Architectural Blueprint (Clean Architecture)

Each feature module is structured into distinct layers to enforce unidirectional dependencies (inner layers do not know about outer layers):

```
src/modules/<module-name>/
├── domain/                  # Enterprise Business Rules (Pure TS, No external deps)
│   ├── <entity>.entity.ts   # Core entities and domain rules
│   └── <repo>.interface.ts  # Repository interfaces (contracts)
│
├── infrastructure/          # Frameworks, Drivers, Databases, and Cache adapters
│   ├── <model>.model.ts     # Mongoose schema
│   └── <repo>.repository.ts # Mongoose/Redis implementations
│
├── application/             # Application Business Rules (Services & Use cases)
│   └── <service>.service.ts # Coordinates entities, ports, and repos
│
├── api/                     # Interface Adapters (Delivery / Express Layer)
│   ├── <ctrl>.controller.ts # Express route handlers
│   ├── <route>.routes.ts    # Route definitions
│   └── <valid>.validation.ts# Zod schemas for payload validation
│
└── <module>.module.ts       # Wires up and exports the module router/dependencies
```

---

## 🛠️ Tech Stack & Key Technologies

* **Runtime:** Node.js (TypeScript)
* **Framework:** Express.js (v5)
* **Database:** MongoDB (using Mongoose ODM)
* **Caching & Rate Limiting:** Redis (using `ioredis`)
* **Validation:** Zod
* **Background Tasks:** Redis-backed queues (planned via BullMQ)
* **Real-time Synchronization:** WebSockets / Socket.io (planned)
* **Testing:** Jest & Supertest (planned)

---

## 🚀 Key Features & CV-Boosting Implementation Details

1. **Clean Domain Boundaries:** Enterprise rules are isolated inside pure TypeScript functions and entities, making them completely testable without database or express dependencies.
2. **Robust Authentication & Roles:** Role-Based Access Control (RBAC) protecting endpoints using signed JWTs.
3. **Database Integrity with Transactions:** Complex writes (like creating a project and adding initial members) are bound in MongoDB ACID Transactions.
4. **Performance Optimized Caching:** Intelligent caching of dashboards and task boards using Redis with active invalidation triggers.
5. **Background Workers (BullMQ):** Heavy operations (such as processing email queues or notifications) are offloaded to Redis message queues.
6. **Real-time Kanban Sync:** Persistent WebSocket connections to synchronize board states across team members instantly.

---

## 📁 Repository Structure

```
├── .agents/                 # Workspace-scoped agent guidelines
├── src/
│   ├── config/              # App environment variables & database clients configuration
│   ├── modules/             # Modulized business features (Auth, Users, Projects, Tasks, Notifications)
│   ├── shared/              # Shared utilities, errors, and express middlewares
│   ├── app.ts               # Express application initialization
│   └── server.ts            # Entrypoint file starting the listener
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB Instance (Local or Atlas)
* Redis Server (Local or Cloud)

### Setup & Run
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables inside `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/echo
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your_jwt_secret_key
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
