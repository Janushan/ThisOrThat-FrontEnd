[Live Site Here](https://thisorthat-260419.appspot.com/)
**NOTE: Please use Facebook login to use the application.**


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in production mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm run-script dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deployment

In the Google Cloud Shell, you can run the following to deploy:

### `rm -rf ThisOrThat-FrontEnd/`
Remove the current version of the frontend project if it exists.

### `git clone https://github.com/Janushan/ThisOrThat-FrontEnd.git`
Clones the latest version of the repo from Github.

### `cd ThisOrThat-FrontEnd/`
Changes directory to the frontend project.

### `gcloud app deploy`
Deploys the application to Google Cloud.<br />
You can learn more in the [documentation](https://cloud.google.com/sdk/gcloud/reference/app/deploy).
