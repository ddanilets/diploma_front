/* eslint-disable import/prefer-default-export */
import bowser from 'bowser';

export function getBowser() {
  if (typeof window === 'undefined' && global.userAgent) {
    return bowser._detect(global.userAgent);
  }

  return bowser;
}
