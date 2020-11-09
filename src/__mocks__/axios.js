export default {
  // We assume server will response with empty object, we keep it as it is for unsplash test
  // when we have response like: res.data.results
  //  get: jest.fn(() => Promise.resolve({ data: { results: []} }))
  // but we want to make it a bit more re-usable
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: () => axios,
  defaults: {
    adapter: {},
  },
};
