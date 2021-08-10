import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import mixpanel from 'mixpanel-browser';

Sentry.init({
  dsn: 'https://89456055e6e94307887e13da8973c28a@o402039.ingest.sentry.io/5900350',
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.SENTRY_ENVIRONMENT,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

mixpanel.init(process.env.MIX_PANEL_KEY);

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
