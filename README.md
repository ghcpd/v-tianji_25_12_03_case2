# E-Commerce Dashboard

## Project Description

This is a React-based e-commerce dashboard application. The project uses React, Redux, React Router, and various other libraries for building the frontend.

## Current Stack

- **React 16.8.0**
- **React Router DOM 5.2.0**
- **Redux 4.0.1 + React-Redux 7.1.0**
- **Axios 0.19.2**
- **Moment.js 2.24.0**
- **Lodash 4.17.15**
- **Webpack 4**
- **node-sass 4.14.1**

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will start on `http://localhost:3000`

## Build

```bash
npm run build
```

## Testing

```bash
npm test
```

## Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Products.js
│   │   ├── Analytics.js
│   │   └── Navigation.js
│   ├── redux/
│   │   ├── store.js
│   │   └── reducers/
│   │       ├── userReducer.js
│   │       ├── productsReducer.js
│   │       └── analyticsReducer.js
│   ├── styles/
│   │   └── main.scss
│   ├── App.js
│   └── index.js
├── .babelrc
├── .eslintrc.json
├── webpack.config.js
├── jest.config.js
└── package.json
```

## Features

- Dashboard with statistics overview
- Product management interface
- Analytics with data visualization
- Redux state management
- React Router navigation
- SCSS styling

## License

MIT
