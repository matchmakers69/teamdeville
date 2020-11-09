export const getFilteredProducts = (
  productsPerPage,
  { searchQuery, sortPrice, categoryName, priceFrom }
) => {
  let products = productsPerPage;

  if (searchQuery) {
    products = [...products].filter(product => {
      return (
        product.name.toLowerCase().indexOf(searchQuery.toLowerCase().trim()) !==
        -1
      );
    });
  }

  if (priceFrom) {
    const from = parseInt(priceFrom, 10).toFixed(2);

    products = products.filter(product => {
      return parseInt(product.price, 10) >= from;
    });
  }

  if (sortPrice) {
    switch (sortPrice) {
      case 'Lowest price':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'Highest price':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
    }
  }

  if (categoryName) {
    products = products.filter(p => {
      let foundCategory = p.categories.findIndex(c => {
        return c.name === categoryName;
      });
      return foundCategory !== -1;
    });
  }

  return products;
};
