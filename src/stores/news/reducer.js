import { CLOSE_NEWS_SIDEBAR, OPEN_NEWS_SIDEBAR } from './types';

const initialState = {
  sidebarOpen: false,
};

export default function newsReducer(state = initialState, action) {
  const { sidebarOpen } = action.payload || {};

  switch (action.type) {
    case OPEN_NEWS_SIDEBAR:
      return {
        ...state,
        sidebarOpen,
      };
    case CLOSE_NEWS_SIDEBAR:
      return {
        ...state,
        sidebarOpen,
      };
    default:
      return state;
  }
}
