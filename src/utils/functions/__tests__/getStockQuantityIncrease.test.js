import { getStockQuantityIncrease } from '../getStockQuntityClick';

const PRODUCT = {
  id: 4144,
  name: '60s STYLE, LIGHTWEIGHT BULLET MIRROR IN BLACK EACH',
  slug: '60s-style-lightweight-bullet-mirror-in-black-each',
  permalink:
    'http://teamdeville.co.uk/product/60s-style-lightweight-bullet-mirror-in-black-each/',
  date_created: '2018-09-24T10:37:04',
  date_created_gmt: '2018-09-24T09:37:04',
  date_modified: '2018-09-24T10:37:04',
  date_modified_gmt: '2018-09-24T09:37:04',
  type: 'simple',
  status: 'publish',
  featured: false,
  catalog_visibility: 'visible',
  description: '',
  short_description: '',
  sku: '',
  price: '28.25',
  regular_price: '28.25',
  sale_price: '',
  date_on_sale_from: null,
  date_on_sale_from_gmt: null,
  date_on_sale_to: null,
  date_on_sale_to_gmt: null,
  price_html:
    '<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">&pound;</span>28.25</span>',
  on_sale: false,
  purchasable: true,
  total_sales: 0,
  virtual: false,
  downloadable: false,
  downloads: [],
  download_limit: -1,
  download_expiry: -1,
  external_url: '',
  button_text: '',
  tax_status: 'taxable',
  tax_class: '',
  manage_stock: false,
  stock_quantity: 3,
  stock_status: 'instock'
};

const INITIAL_ARRAY = [
  {
    id: 4144,
    name: '60s STYLE, LIGHTWEIGHT BULLET MIRROR IN BLACK EACH',
    slug: '60s-style-lightweight-bullet-mirror-in-black-each',
    permalink:
      'http://teamdeville.co.uk/product/60s-style-lightweight-bullet-mirror-in-black-each/',
    date_created: '2018-09-24T10:37:04',
    date_created_gmt: '2018-09-24T09:37:04',
    date_modified: '2018-09-24T10:37:04',
    date_modified_gmt: '2018-09-24T09:37:04',
    type: 'simple',
    status: 'publish',
    featured: false,
    catalog_visibility: 'visible',
    description: '',
    short_description: '',
    sku: '',
    price: '28.25',
    regular_price: '28.25',
    sale_price: '',
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    price_html:
      '<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">&pound;</span>28.25</span>',
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: -1,
    download_expiry: -1,
    external_url: '',
    button_text: '',
    tax_status: 'taxable',
    tax_class: '',
    manage_stock: false,
    stock_quantity: 5,
    stock_status: 'instock'
  },
  {
    id: 4169,
    name: 'LAMINATED WINDSCREENS AND HEATED SCREENS',
    slug: 'laminated-windscreens-and-heated-screens-3',
    permalink:
      'http://teamdeville.co.uk/product/laminated-windscreens-and-heated-screens-3/',
    date_created: '2019-03-03T14:00:16',
    date_created_gmt: '2019-03-03T14:00:16',
    date_modified: '2019-03-03T14:00:16',
    date_modified_gmt: '2019-03-03T14:00:16',
    type: 'simple',
    status: 'publish',
    featured: false,
    catalog_visibility: 'visible',
    description: '',
    short_description: '',
    sku: '',
    price: '',
    regular_price: '',
    sale_price: '',
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    price_html: '',
    on_sale: false,
    purchasable: false,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: -1,
    download_expiry: -1,
    external_url: '',
    button_text: '',
    tax_status: 'taxable',
    tax_class: '',
    manage_stock: false,
    stock_quantity: 4,
    stock_status: 'instock'
  }
];

const EXPECTED_ARRAY = [
  {
    id: 4144,
    name: '60s STYLE, LIGHTWEIGHT BULLET MIRROR IN BLACK EACH',
    slug: '60s-style-lightweight-bullet-mirror-in-black-each',
    permalink:
      'http://teamdeville.co.uk/product/60s-style-lightweight-bullet-mirror-in-black-each/',
    date_created: '2018-09-24T10:37:04',
    date_created_gmt: '2018-09-24T09:37:04',
    date_modified: '2018-09-24T10:37:04',
    date_modified_gmt: '2018-09-24T09:37:04',
    type: 'simple',
    status: 'publish',
    featured: false,
    catalog_visibility: 'visible',
    description: '',
    short_description: '',
    sku: '',
    price: '28.25',
    regular_price: '28.25',
    sale_price: '',
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    price_html:
      '<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">&pound;</span>28.25</span>',
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: -1,
    download_expiry: -1,
    external_url: '',
    button_text: '',
    tax_status: 'taxable',
    tax_class: '',
    manage_stock: false,
    stock_quantity: 4,
    stock_status: 'instock'
  },
  {
    id: 4169,
    name: 'LAMINATED WINDSCREENS AND HEATED SCREENS',
    slug: 'laminated-windscreens-and-heated-screens-3',
    permalink:
      'http://teamdeville.co.uk/product/laminated-windscreens-and-heated-screens-3/',
    date_created: '2019-03-03T14:00:16',
    date_created_gmt: '2019-03-03T14:00:16',
    date_modified: '2019-03-03T14:00:16',
    date_modified_gmt: '2019-03-03T14:00:16',
    type: 'simple',
    status: 'publish',
    featured: false,
    catalog_visibility: 'visible',
    description: '',
    short_description: '',
    sku: '',
    price: '',
    regular_price: '',
    sale_price: '',
    date_on_sale_from: null,
    date_on_sale_from_gmt: null,
    date_on_sale_to: null,
    date_on_sale_to_gmt: null,
    price_html: '',
    on_sale: false,
    purchasable: false,
    total_sales: 0,
    virtual: false,
    downloadable: false,
    downloads: [],
    download_limit: -1,
    download_expiry: -1,
    external_url: '',
    button_text: '',
    tax_status: 'taxable',
    tax_class: '',
    manage_stock: false,
    stock_quantity: 4,
    stock_status: 'instock'
  }
];

it('should update existing object', () => {
  const updatedArray = getStockQuantityIncrease(PRODUCT, INITIAL_ARRAY);
  expect(updatedArray).toEqual(EXPECTED_ARRAY);
});

it('should not update if product does not exist', () => {
  const updatedArray = getStockQuantityIncrease(
    {
      id: 41440000000,
      name: '60s STYLE, LIGHTWEIGHT BULLET MIRROR IN BLACK EACH',
      slug: '60s-style-lightweight-bullet-mirror-in-black-each',
      permalink:
        'http://teamdeville.co.uk/product/60s-style-lightweight-bullet-mirror-in-black-each/',
      date_created: '2018-09-24T10:37:04',
      date_created_gmt: '2018-09-24T09:37:04',
      date_modified: '2018-09-24T10:37:04',
      date_modified_gmt: '2018-09-24T09:37:04',
      type: 'simple',
      status: 'publish',
      featured: false,
      catalog_visibility: 'visible',
      description: '',
      short_description: '',
      sku: '',
      price: '28.25',
      regular_price: '28.25',
      sale_price: '',
      date_on_sale_from: null,
      date_on_sale_from_gmt: null,
      date_on_sale_to: null,
      date_on_sale_to_gmt: null,
      price_html:
        '<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">&pound;</span>28.25</span>',
      on_sale: false,
      purchasable: true,
      total_sales: 0,
      virtual: false,
      downloadable: false,
      downloads: [],
      download_limit: -1,
      download_expiry: -1,
      external_url: '',
      button_text: '',
      tax_status: 'taxable',
      tax_class: '',
      manage_stock: false,
      stock_quantity: 5,
      stock_status: 'instock'
    },
    INITIAL_ARRAY
  );
  expect(updatedArray).toEqual(INITIAL_ARRAY);
});
