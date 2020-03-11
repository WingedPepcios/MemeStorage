import ReactGA from 'react-ga';

ReactGA.initialize('UA-160262521-1');

export const pageview = (location) => {
  ReactGA.pageview(location);
};
