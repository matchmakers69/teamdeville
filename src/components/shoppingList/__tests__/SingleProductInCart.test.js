import React from 'react';
import SingleProductInCart from '../SingleProductInCart';
import { shallow } from 'enzyme';

const product = {
  id: 4172,
  name: 'PowerSPARK Electronic Ignition Kit for neg earth D23',
  slug: 'powerspark-electronic-ignition-kit-for-neg-earth',
  permalink:
    'http://teamdeville.co.uk/product/powerspark-electronic-ignition-kit-for-neg-earth/',
  date_created: '2019-03-25T16:20:28',
  date_created_gmt: '2019-03-25T16:20:28',
  date_modified: '2020-04-04T11:43:35',
  date_modified_gmt: '2020-04-04T10:43:35',
  type: 'simple',
  status: 'publish',
  featured: false,
  catalog_visibility: 'visible',
  description: '',
  short_description: '',
  sku: '',
  price: '48.25',
  regular_price: '48.25',
  sale_price: '',
  date_on_sale_from: null,
  date_on_sale_from_gmt: null,
  date_on_sale_to: null,
  date_on_sale_to_gmt: null,
  price_html:
    '<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">&pound;</span>48.25</span>',
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
  manage_stock: true,
  stock_quantity: 1,
  stock_status: 'instock',
  backorders: 'no',
  backorders_allowed: false,
  backordered: false,
  sold_individually: false,
  weight: '',
  dimensions: {
    length: '',
    width: '',
    height: '',
  },
  shipping_required: true,
  shipping_taxable: true,
  shipping_class: '',
  shipping_class_id: 0,
  reviews_allowed: true,
  average_rating: '0.00',
  rating_count: 0,
  related_ids: [1323, 1301, 1317, 1306, 1325],
  upsell_ids: [],
  cross_sell_ids: [],
  parent_id: 0,
  purchase_note: '',
  categories: [
    {
      id: 59,
      name: 'Lotus Cortina Ignition',
      slug: 'lotus-cortina-ignition',
    },
  ],
  tags: [],
  images: [
    {
      id: 4617,
      date_created: '2019-10-21T21:30:56',
      date_created_gmt: '2019-10-21T19:30:56',
      date_modified: '2019-10-21T21:38:13',
      date_modified_gmt: '2019-10-21T19:38:13',
      src:
        'http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/03/fordanglia-1-e1583269256842.jpg',
      name: 'CJ7 5361 Martin Reynolds, Ford Anglia 105E',
      alt: '',
    },
  ],
  attributes: [],
  default_attributes: [],
  variations: [],
  grouped_products: [],
  menu_order: 0,
  meta_data: [
    {
      id: 41415,
      key: '_upsell_skus',
      value: [],
    },
    {
      id: 41416,
      key: '_crosssell_skus',
      value: [],
    },
    {
      id: 41419,
      key: '_min_variation_price',
      value: '',
    },
    {
      id: 41420,
      key: '_max_variation_price',
      value: '',
    },
    {
      id: 41421,
      key: '_min_variation_regular_price',
      value: '',
    },
    {
      id: 41422,
      key: '_max_variation_regular_price',
      value: '',
    },
    {
      id: 41423,
      key: '_min_variation_sale_price',
      value: '',
    },
    {
      id: 41424,
      key: '_max_variation_sale_price',
      value: '',
    },
    {
      id: 41426,
      key: '_file_path',
      value: '',
    },
    {
      id: 41430,
      key: '_product_url',
      value: '',
    },
    {
      id: 41431,
      key: '_button_text',
      value: '',
    },
    {
      id: 48030,
      key: 'main_product_min_quantity_to_all',
      value: 'no',
    },
    {
      id: 48031,
      key: 'alg_wc_pq_min_4172_to_all',
      value: 'no',
    },
    {
      id: 48032,
      key: 'main_product_max_quantity_to_all',
      value: 'no',
    },
    {
      id: 48033,
      key: 'alg_wc_pq_max_4172_to_all',
      value: 'no',
    },
    {
      id: 48034,
      key: 'main_product_step_quantity_to_all',
      value: 'no',
    },
    {
      id: 48035,
      key: 'alg_wc_pq_step_4172_to_all',
      value: 'no',
    },
    {
      id: 48036,
      key: '_yoast_wpseo_metadesc',
      value: '%%title%% %%sep%% %%sitename%%',
    },
    {
      id: 48037,
      key: '_yoast_wpseo_content_score',
      value: '30',
    },
  ],
  acf: [],
  _links: {
    self: [
      {
        href: 'http://teamdeville.co.uk/wp-json/wc/v3/products/4172',
      },
    ],
    collection: [
      {
        href: 'http://teamdeville.co.uk/wp-json/wc/v3/products',
      },
    ],
  },
};

const setup = () => {
  return shallow(
    <SingleProductInCart
      product={product}
      handleRemoveProductFromCart={() => {}}
      handleInputQuantityChange={() => {}}
      handleQuantityIncrement={() => {}}
    />
  );
};

describe('<DeliveryOptions />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('renders SingleProductInCart component without crash', () => {
    expect(wrapper.length).toBe(1);
  });
});
