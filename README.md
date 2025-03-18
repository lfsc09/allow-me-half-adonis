## Running the Project

### Dev

#### 1. Initiate local Database

```bash
docker compose up --build --detach
```

```bash
docker compose down rmi --all
```

#### 2. Run Migrations & Seeds

```bash
npm run migrations:fresh
```

#### 3. Run project

```bash
npm run dev
```
