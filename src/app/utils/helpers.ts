import { environment } from '../../environments/environment';

/**
 * Build & Get Api url
 */
export function buildApiURL(endpoint: string, apiToUse: 'rating' | 'data' = 'data') {
  if (apiToUse === 'rating') {
    return environment.api_urls.rating + '/' + endpoint;
  }
  return environment.api_urls.data + '/' + endpoint;
}

/**
 * Sort array by object key
 */
export function compare(key: string, order: 'acs' | 'desc' = 'acs') {
  return (a: any, b: any) => {
    if (a[key] > b[key]) return order === 'desc' ? -1 : 1;
    if (a[key] < b[key]) return order === 'desc' ? 1 : -1;
    return 0;
  };
}

export function isDateToday(dateToCheck: Date) {
  const today = new Date();
  return (
    dateToCheck.getDate() === today.getDate() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement, percentVisible: number = 0) => {
  if (!element) return false;

  let rect = element.getBoundingClientRect();
  let windowHeight = window.innerHeight || document.documentElement.clientHeight;

  return !(
    Math.floor(100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  );
};

/**
 * Add delay to promise
 */
export function promiseDelay(delay: number) {
  return function (x: any) {
    return new Promise((resolve) => setTimeout(() => resolve(x), delay));
  };
}

/**
 * Encode string to base64
 */
// export const btoa = (str: string) => new Buffer.from(str, 'binary').toString('base64');

/**
 * Decode from base64 to string
 *
 * @param {string} base64Str
 */
export const atob = (base64Str: string) => Buffer.from(base64Str, 'base64').toString('binary');

/**
 * Get Descendant Prop from object
 */
export const getDescendantProp = (obj: { [key: string]: any }, path: string) => {
  return path.split('.').reduce((acc: any, part) => acc && acc[part], obj);
};

export const isObject = (item: any) => {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Deep merge two objects.
 */
export const mergeDeepObjects = (
  target: { [key: string]: any },
  source: { [key: string]: any }
) => {
  let output = { ...target };

  if (isObject(target) && isObject(source)) {
    for (let key in source) {
      if (isObject(source[key])) {
        if (target[key]) {
          output[key] = mergeDeepObjects(target[key], source[key]);
        } else {
          output = { ...output, [key]: source[key] };
        }
      } else {
        output = { ...output, [key]: source[key] };
      }
    }
  }

  return output;
};

export const sortObjectByKeys = (obj: { [key: string]: any }) => {
  if (!isObject(obj)) return;

  return Object.keys(obj)
    .sort()
    .reduce((result: { [key: string]: any }, key) => {
      result[key] = obj[key];
      return result;
    }, {});
};
