# Sociopedia Frontend

**Version:** 0.1.0

Sociopedia Frontend is the client-side application of Sociopedia, a MERN (MongoDB, Express.js, React.js, Node.js) based social media platform. This application is built using React.js and integrates with the Sociopedia backend server to provide users with an interactive and responsive social media experience.

## Features

- **Modern UI:** Utilizes Material-UI for sleek and intuitive user interfaces.
- **State Management:** Employs Redux Toolkit and React-Redux for efficient state management.
- **Form Handling:** Integrates Formik and Yup for seamless form validation and user input.
- **File Upload:** Supports file uploads using React Dropzone for profile picture uploads and media sharing.
- **Authentication:** Implements secure authentication mechanisms for user login and registration.
- **Routing:** Utilizes React Router DOM for smooth navigation between different views.

## Prerequisites

Before running the Sociopedia Frontend application, ensure you have the following installed:

- **Node.js:** [Download and install Node.js](https://nodejs.org/).
- **npm:** npm is included with Node.js. If you are using Node.js version 5.2.0 or higher, npm is already installed.
- **React Scripts:** Sociopedia Frontend is bootstrapped with Create React App, which uses React Scripts. Install it globally using `npm install -g react-scripts`.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd sociopedia-frontend`
3. Install dependencies: `npm install`

## Usage

- **Development:** Run the app in development mode: `npm start`. Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Production Build:** Create a production-ready build: `npm run build`.

## Environment Variables

Sociopedia Frontend uses environment variables for configuration. Create a `.env` file in the root directory and define the following variables:

```env
REACT_APP_BACKEND_URL=<URL_OF_YOUR_SOCIOPEDIA_BACKEND_SERVER>
