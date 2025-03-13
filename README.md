### Features

As user I want to have possibility:

1. Create new template of agreement
   a) Edit this template (by adding or deleting new fields),
   b) Have access to history of changes in area of my account,
   c) Being able to restore/rollback version to some point in time
2. Choose and edit existing templates

### Endpoints

- /auth/login POST
  history of logging
  [device, timestamp, ip, active?]
- /auth/refresh-token POST
- /auth/signup POST
- /auth/logout GET
- /auth/confirm POST
  confirmation on email

- /document GET
- /document/[:id] POST|PATCH|DELETE|GET

- /template/[:id] POST|PATCH|DELETE|GET
- /template/[:id]/assign/[:documentId] GET
