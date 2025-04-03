### Features

As user I want to have possibility:

1. Create new template of agreement
   a) Edit this template (by adding or deleting new fields),
   b) Have access to history of changes in area of my account,
   c) Being able to restore/rollback version to some point in time
2. Choose and edit existing templates

### Thoughts / Questions / Solutions

- How to keep history of fields values ?
  Let's assume that each template edit - aggregated template_fields shnapshot save will trigger new tamplate creation.
  Those fields will have specific ids to which document values can be linked.
  I we'd like to go back in history from Document point of view, we will be walking on template timeline as initial reference - adjusting any values based on available field ids at the moment.
  Easiest solution for now would be to keep last value for given field..
  - should that be improved by othere level of values versioning(?)

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
