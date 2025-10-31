# Welcome to React Router!

A frontend project for the eSaving (Credit Jambo) technical test. Built with ReactJs + TailwindCss. It incorporates role-based authentication for both customers and admins with a wide range of features including authentication (JWT + Refresh Tokens), savings, loans and profile management.

## Features

- Client-side rendering
- Hot Module Replacement (HMR)
- TailwindCSS for styling
- RBAC authentication
- Transactions management (saving, withdraw)
- Loans
- Accounts management

## Tech stack
- ReactJs.
- TailwindCSS
- JWT authentication
- Docker containerization

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t esaving@latest .

# Run the container
docker run -p 3000:3000 esaving@latest
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

Make sure to deploy the output of `npm run build`

```bash
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Project structure
```bash
.
├── app
│   ├── api # API services
│   │   ├── auth.ts
│   │   ├── client.ts
│   │   └── users.ts
│   ├── app.css
│   ├── components
│   │   ├── admin
│   │   ├── common # Shared components
│   │   └── customer
│   ├── context
│   │   └── auth
│   │       └── auth-context.tsx
│   ├── layouts
│   │   ├── admin.tsx
│   │   └── customer.tsx
│   ├── pages
│   │   ├── admin
│   │   │   └── users.tsx
│   │   ├── common
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   └── customer
│   ├── root.tsx
│   ├── routes
│   │   ├── admin
│   │   │   ├── home.tsx
│   │   │   └── users.tsx
│   │   ├── customer
│   │   │   └── home.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── splash.tsx
│   ├── routes.ts
│   ├── types
│   │   ├── auth
│   │   │   └── index.ts
│   │   └── common
│   │       ├── enum.ts
│   │       └── index.ts
│   └── utils
│       ├── formatting.ts
│       └── index.ts
├── Dockerfile
├── package.json
├── package-lock.json
├── public
│   └── favicon.ico
├── react-router.config.ts
├── README.md
├── LICENCE
├── test.md
├── tsconfig.json
└── vite.config.ts
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) already configured a seamless experience.

---

## Author

- Egide HARERIMANA [https://github.com/degide](https://github.com/degide)
