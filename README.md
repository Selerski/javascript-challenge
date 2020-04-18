# Vortexa Technical challenge

### Developed by Pawel Pietruszka

## Getting Started

1. Firstly, run `npm install` and then `npm run build` in the `/client` folder.
2. Next, go to `/server` and run `npm install` there. Once the installation is completed, key in `npm start` to serve the application from the JavaScript Express server!
3. Alternatively, go to `/typescriptServer` and run `npm install`, followed by `npm run start`, to serve the application from a TypeScript Express server.

The app will run on `http://localhost:3000/`.

NOTE: Sometimes after `npm install` the TS server throws an error because it is, supposedly, not able to locate Express in node_modules. If you encounter this issue, it can be fixed by copying the first line of `index.ts`, pasting it again in the same place and saving the file. Some users on StackOverflow have also noticed this bug and claim it may be an issue with VSCode.

## Tech stack

For this project, I have used the following tools:

- React & Redux (front end components & state management)
- express (server)
- react-map-gl (map)
- react-chartjs-2 (data visualisation)
- Typescript - experimental server, as I had never user TS before.

## Note about .env

I deliberately kept the `.env` file in `/client`, to make sure that the map component renders without problems. While I know this is not a good practice, I will generate a new API key later this week, once the assessment is completed :)
