<div align="center">

# Emit

**Developer-first notification infrastructure for modern applications.**

Emit is a standalone notification engine for sending, managing, routing, and tracking multi-channel notifications across email, SMS, push, and in-app messaging from a single platform.

<br />

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-Queueing-black)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

</div>

---

## About Emit

Modern applications generate many events:

- Orders are placed
- Payments succeed or fail
- Accounts are created
- Passwords are reset
- Tickets are assigned
- Security alerts are triggered
- Subscriptions expire

Emit provides a centralized notification infrastructure layer that allows applications to emit events while Emit handles the notification delivery lifecycle.

```text
Application
    │
    ▼
   Emit
    │
    ├── Resolve Event
    ├── Resolve Recipient
    ├── Apply Routing Rules
    ├── Check Preferences
    ├── Render Template
    ├── Queue Notification
    └── Track Delivery
          │
          ├── Email
          ├── SMS
          ├── Push
          └── In-App
```

The goal is simple:

> **One event. Every channel.**

---

## Core Features

Emit is being designed around the following capabilities:

- Event-driven notification delivery
- Multi-channel notifications
- Email
- SMS
- Push notifications
- In-app notifications
- Notification templates
- Recipient management
- Notification preferences
- Event routing
- Background processing
- Automatic retries
- Delivery tracking
- Notification history
- Webhooks
- API key authentication
- Project environments
- Scheduling
- Notification workflows
- Analytics
- Developer SDKs

---

## Architecture

Emit uses an event-first architecture.

Applications should not need to know how a notification is delivered.

Instead of:

```ts
await sendEmail();
await sendSms();
await sendPush();
```

applications emit an event:

```ts
await emit.publish('order.completed', {
  recipientId: 'usr_123',
  data: {
    orderNumber: 'TA-1024',
  },
});
```

Emit determines how that event should be delivered.

```text
order.completed
       │
       ▼
Notification Engine
       │
       ├── EMAIL
       ├── PUSH
       └── IN_APP
```

---

## Tech Stack

### Backend

- NestJS
- TypeScript

### Database

- PostgreSQL
- Prisma

### Queues

- Redis
- BullMQ

### Infrastructure

- Docker
- Docker Compose

### API

- REST
- OpenAPI / Swagger

### Observability

Planned:

- Structured logging
- OpenTelemetry
- Sentry
- Queue metrics
- Provider health monitoring

---

## Project Structure

The project is intended to evolve into the following structure:

```text
emit/
├── apps/
│   ├── api/
│   ├── worker/
│   └── web/
│
├── packages/
│   ├── database/
│   ├── contracts/
│   ├── config/
│   ├── providers/
│   └── sdk/
│
├── docker/
├── docs/
└── README.md
```

The initial implementation may remain inside a single NestJS application while the core architecture is established.

---

## Core Domains

```text
src/
├── auth/
├── projects/
├── api-keys/
├── events/
├── notifications/
├── recipients/
├── templates/
├── preferences/
├── providers/
│   ├── email/
│   ├── sms/
│   ├── push/
│   └── in-app/
├── queues/
├── webhooks/
├── analytics/
└── health/
```

---

## Notification Lifecycle

A typical Emit notification follows this lifecycle:

```text
Event Received
      │
      ▼
Event Validated
      │
      ▼
Recipient Resolved
      │
      ▼
Routing Rules Evaluated
      │
      ▼
Preferences Checked
      │
      ▼
Template Rendered
      │
      ▼
Notification Queued
      │
      ▼
Worker Processes Job
      │
      ▼
Provider Sends Notification
      │
      ▼
Delivery Recorded
```

---

## Notification Statuses

Notifications can transition through states such as:

```text
PENDING
QUEUED
PROCESSING
SENT
DELIVERED
FAILED
READ
```

Channel-specific implementations may support additional delivery states.

---

## Example Event

```http
POST /v1/events
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

```json
{
  "event": "order.completed",
  "recipient": {
    "email": "customer@example.com"
  },
  "data": {
    "orderNumber": "TA-1024",
    "total": 1299
  }
}
```

Emit can then resolve the configured notification channels:

```text
order.completed
├── EMAIL
├── PUSH
└── IN_APP
```

---

## Provider Architecture

Notification providers are isolated behind provider interfaces.

For example:

```ts
interface EmailProvider {
  send(input: SendEmailInput): Promise<SendResult>;
}
```

This allows Emit to support multiple providers without coupling the core notification engine to a specific vendor.

Possible email providers include:

```text
EmailProvider
├── Resend
├── AWS SES
├── SendGrid
└── Mailgun
```

The same pattern will be used for SMS, push, and other channels.

---

## Queue Architecture

Notifications should be processed asynchronously.

```text
Emit API
   │
   ▼
BullMQ
   │
   ▼
Redis
   │
   ▼
Notification Worker
   │
   ├── Email Provider
   ├── SMS Provider
   ├── Push Provider
   └── In-App Provider
```

This provides:

- Background processing
- Retry support
- Backoff strategies
- Failure recovery
- Improved API response times
- Independent worker scaling

---

## MVP Scope

The first production-ready version of Emit will focus on:

```text
Foundation
   ↓
Events
   ↓
Notification Engine
   ↓
BullMQ Workers
   ↓
Email Delivery
   ↓
Templates
   ↓
Recipients
   ↓
Basic Dashboard
```

The MVP objective is:

> An application emits an event, Emit reliably delivers the correct notification, and the complete delivery lifecycle is recorded.

---

## Project Setup

Install dependencies:

```bash
yarn install
```

---

## Environment Variables

Create a `.env` file based on the project environment configuration.

Example:

```env
NODE_ENV=development

PORT=3000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/emit

REDIS_HOST=localhost
REDIS_PORT=6379

RESEND_API_KEY=

JWT_SECRET=
```

Do not commit production secrets to source control.

---

## Running the Project

### Development

```bash
yarn start:dev
```

### Standard

```bash
yarn start
```

### Production

```bash
yarn start:prod
```

---

## Testing

### Unit Tests

```bash
yarn test
```

### End-to-End Tests

```bash
yarn test:e2e
```

### Test Coverage

```bash
yarn test:cov
```

---

## API Documentation

When the application is running locally, API documentation will be available through Swagger.

Example:

```text
http://localhost:3000/docs
```

---

## Health Check

Emit exposes a health endpoint for infrastructure monitoring.

```http
GET /health
```

Example response:

```json
{
  "status": "ok"
}
```

Future health checks will include:

- PostgreSQL
- Redis
- Queue workers
- Notification providers

---

## Design Principles

Emit is being built around a few core principles.

### Event First

Applications emit business events rather than directly invoking individual notification providers.

### Provider Agnostic

The core notification engine should not depend on Resend, Twilio, Firebase, or any other single provider.

### Asynchronous by Default

External notification delivery should happen through background workers rather than blocking application requests.

### Reliable Delivery

Retries, idempotency, failure tracking, and dead-letter handling should be built into the platform.

### Developer Experience

Emit should remain easy to integrate through a simple API and lightweight SDKs.

---

## Status

Emit is currently under active development.

The initial focus is the core notification infrastructure, email delivery, queue processing, templates, and recipient management.

---

## Author

**Kabelo Moobi**

Software Engineer

---

## License

License information will be defined as the project approaches its first public release.