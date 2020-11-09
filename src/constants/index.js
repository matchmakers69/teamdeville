import * as news from './news';

import { errorMappings } from './errors';
import { messages } from './messages';
import { routes } from './routes';
export default {
  ...routes,
  ...messages,
  ...news,
  errorMappings,
};
