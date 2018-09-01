# Prerequisite
* Install docker and docker-compose
* Start the prisma service with
`docker-compose -f prisma/docker-compose.yml up`
* Install prisma with
`yarn global add prisma`
* Deploy data models to prisma with `prisma deploy`
* Install project dependencies with `yarn`

# Frontend
To view the demo, run
```bash
npx react-scripts start
```

# Server
To run the graphql server, issue the following command.
```bash
node src/server.js
```

# GraphQl playground
Open the GraphQL playground with
```bash
graphql playground
```

# Import csv data
Import questions and answers in csv to the prisma with the command
```bash
node src/script.js AS-4000-train.csv
```