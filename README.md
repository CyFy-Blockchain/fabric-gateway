# Fabric Gateway - API

## Running the project locally for development

Install the dependencies:

```bash
npm
```

Then, run the development server:

```bash
npm run start:dev
```

To run the production server:

```bash
npm run build
```

```bash
npm run start:prod
```

> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Migrations

### To generate / run / revert a migration, make build first

```bash
npm run build
```

### Create a new migration

```bash
TableName=<name> npm run migration:create
```

### Generate a migration from existing table schema <br />

Automatic migration generation creates a new migration file and writes all sql queries that must be executed to update the database

Generate migration locally

```bash
TableName=<name> npm run local-migration:generate
```

Generate migration on production

```bash
TableName=<name> npm run prod-migration:generate
```

### Run migrations <br />

To execute all pending migrations use following command:

To run a migration locally

```bash
npm run local-migration:run
```

To run a migration on Production

```bash
npm run prod-migration:run
```

### Revert migrations <br />

To revert the most recently executed migration use the following command:

To revert a migration locally

```bash
npm run local-migration:revert
```

To revert a migration on Production

```bash
npm run prod-migration:revert
```

### Show migrations <br />

To show all migrations and whether they've been run or not use following command:

To show migrations locally

```bash
npm run local-migration:show
```

To show migrations on Production

```bash
npm run prod-migration:show
```

### Sync database schema <br />

To synchronize a database schema use:

To sync database schema locally

```bash
npm run local-migration:schema-sync
```

To sync database schema on Production

```bash
npm run prod-migration:schema-sync
```

### Log sync database schema queries without actual running them <br />

To check what sql queries schema:sync is going to run use:

To check sql queries locally:

```bash
npm run local-migration:schema-log
```

To check sql queries on Production:

```bash
npm run prod-migration:schema-log
```

### Drop database schema <br />

To completely drop a database schema use:

Drop database scehma locally

```bash
npm run local-migration:schema-drop
```

Drop database scehma on Production

```bash
npm run prod-migration:schema-drop
```

