const getParentCategories = (categories) =>
  categories.filter((category) => category.parent === 0);

const getSubCategories = (categories) =>
  categories.filter((category) => category.parent !== 0);

const getNestedCategories = (categories) => {
  const parentCategories = getParentCategories(categories);
  const subCategories = getSubCategories(categories);

  const nestedCategories = parentCategories.map((parent) => {
    const children = subCategories.filter(
      (subcategory) => parent.id === subcategory.parent
    );
    return { ...parent, children };
  });
  return nestedCategories;
};

export default getNestedCategories;
