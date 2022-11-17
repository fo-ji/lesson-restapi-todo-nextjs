## Docker

```bash
$ docker-compose build
```

## Next.js

```bash
$ docker-compose run --rm app yarn create next-app lesson-restapi-todo-nextjs --ts\
&& mv lesson-restapi-todo-nextjs/* . && mv lesson-restapi-todo-nextjs/.* . && rm -r lesson-restapi-todo-nextjs\
&& mkdir src && mv pages styles src/
```

```diff
# package.json
{
  "name": "reactive-everyday",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
+    "start": "next start -p 8080",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "12.3.1",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "18.11.0",
    "@types/react": "18.0.21",
    "@types/react-dom": "18.0.6",
    "eslint": "8.25.0",
    "eslint-config-next": "12.3.1",
    "typescript": "4.8.4"
  }
}

# tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
+    "baseUrl": ".",
+    "paths": {
+      "@/*": ["src/*"]
+    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

```

## Prisma
```bash
$ docker-compose run --rm app yarn add -D prisma
$ docker-compose run --rm app npx prisma init
$ docker-compose run --rm app yarn add @prisma/client
```

## Sync DB Types
### .env
```diff
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

- DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
+ DATABASE_URL="postgresql://user:password@host:port_number/db_name?schema=public"
```
```bash
$ docker exec -it lesson-restapi-todo-nextjs sh
$ npx prisma db pull
$ npx prisma generate
```