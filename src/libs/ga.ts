// const isProduction = process.env.NODE_ENV === 'production' && !__DEV__;

export const GOOGLE_ANALYTICS_ID = 'G-1NJP2XZQ9B';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (__DEV__) return;
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};

//developers.google.com/analytics/devguides/collection/gtagjs/events?hl=ja
export const eventLog = ({
  action,
  event_category,
  event_label,
  value,
}: {
  action: string;
  event_category?: string;
  event_label?: string;
  value?: number;
}) => {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
  });
};
