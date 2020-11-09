export const getProductCateroryNames = categories => {
  const catatgoryNames = categories.reduce((array, category) => {
    return [...array, category.name];
  }, []);

  return catatgoryNames;
};
