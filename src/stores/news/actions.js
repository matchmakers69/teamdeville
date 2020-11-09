import { CLOSE_NEWS_SIDEBAR, OPEN_NEWS_SIDEBAR } from './types';

export const openNewsSidebar = () => ({
  type: OPEN_NEWS_SIDEBAR,
  payload: {
    sidebarOpen: true,
  },
});

export const closeNewsSidebar = () => ({
  type: CLOSE_NEWS_SIDEBAR,
  payload: {
    sidebarOpen: false,
  },
});
