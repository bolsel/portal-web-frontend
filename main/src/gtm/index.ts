export const GTM_ID = 'GTM-P38RHGM';

export const pageview = (url) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
