/* eslint-disable prefer-destructuring */
// eslint-disable-next-line no-unused-vars
const parseQuery = () => {
  let url = window.location.search;
  url = url.slice(1);
  const strArray = url.split('&');
  const strObj = {};
  strArray.forEach((item) => {
    const keys = item.split('=');
    strObj[keys[0]] = keys[1];
  });
  return strObj;
};
