import config from 'book-me/config/environment';

export default function resolveDelay(delay) {
  if (config.environment === 'test') {
    return 0;
  } else {
    return delay;
  }
}
