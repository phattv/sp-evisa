// https://malloc.fi/using-google-analytics-with-next-js
// @flow
import ReactGA from 'react-ga';

const initGA = () => {
  console.log('GA init');
  ReactGA.initialize('UA-116667894-1');
};

const logPageView = () => {
  const logPageViewInternal = () => {
    console.log(`Logging pageview for ${window.location.pathname}`);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  };

  // Wait for GA_INITIALIZED
  if (!window.GA_INITIALIZED) {
    setTimeout(logPageViewInternal, 100);
  } else {
    logPageViewInternal();
  }
};

const logEvent = (category: string = '', action: string = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

const logException = (description: string = '', fatal: boolean = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};

export { initGA, logPageView, logEvent, logException };
