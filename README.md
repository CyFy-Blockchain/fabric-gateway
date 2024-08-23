# Fabric - Gateway

 ## Running the project locally for development

Install the dependencies:

 ```bash
 yarn
 ```

 Then, run the development server:

 ```bash
 yarn start:dev
 ```

 To run the production server:

 ```bash
 yarn build
 ```

 ```bash
 yarn start:prod
 ```

 > Open [http://localhost:3000/api/v1/server-health-check](http://localhost:3000/api/v1/server-health-check) with your browser to see the result

 ## Migrations

 ### To generate / run / revert a migration, make build first

 ```bash
 yarn build
 ```

 ### Create a new migration

 ```bash
 TableName=<name> yarn migration:create
 ```

 ### Generate a migration from existing table schema <br />

 Automatic migration generation creates a new migration file and writes all sql queries that must be executed to update the database

 ```bash
 TableName=<name> yarn migration:generate
 ```

 ### Run migrations <br />

 To execute all pending migrations use following command:

 To run a migration locally

 ```bash
 yarn local-migration:run
 ```

 To run a migration on Production

 ```bash
 yarn prod-migration:run
 ```

 ### Revert migrations <br />

 To revert the most recently executed migration use the following command:

 To revert a migration locally

 ```bash
 yarn local-migration:revert
 ```

 To revert a migration on Production

 ```bash
 yarn prod-migration:revert
 ```

 ### Show migrations <br />

 To show all migrations and whether they've been run or not use following command:

 To show migrations locally

 ```bash
 yarn local-migration:show
 ```

 To show migrations on Production

 ```bash
 yarn prod-migration:show
 ```

 ### Sync database schema <br />

 To synchronize a database schema use:

 To sync database schema locally

 ```bash
 yarn local-migration:schema-sync
 ```

 To sync database schema on Production

 ```bash
 yarn prod-migration:schema-sync
 ```

 ### Log sync database schema queries without actual running them <br />

 To check what sql queries schema:sync is going to run use:

 To check sql queries locally:

 ```bash
 yarn local-migration:schema-log
 ```

 To check sql queries on Production:

 ```bash
 yarn prod-migration:schema-log
 ```

 ### Drop database schema <br />

 To completely drop a database schema use:

 Drop database scehma locally

 ```bash
 yarn local-migration:schema-drop
 ```

 Drop database scehma on Production

 ```bash
 yarn prod-migration:schema-drop
 ```
 