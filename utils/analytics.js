// https://malloc.fi/using-google-analytics-with-next-js
// @flow
import ReactGA from 'react-ga';

export const initGA = () => {
  console.log('GA init');
  ReactGA.initialize('UA-116667894-1');
};

export const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category: string = '', action: string = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (
  description: string = '',
  fatal: boolean = false,
) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
