import { BrowserRouter } from 'react-router-dom';
import PhotoGallery from '../PhotoGallery';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import { findByTestAttr } from '../../../../tests/testUtils';
import { mount } from 'enzyme';

const MOCKED_PHOTOS = [
  {
    id: 4308,
    date: '2019-09-02T22:24:53',
    date_gmt: '2019-09-02T21:24:53',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4308',
    },
    modified: '2019-09-02T22:24:53',
    modified_gmt: '2019-09-02T21:24:53',
    slug: 'gallery-thirteen',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-thirteen/',
    title: {
      rendered: 'Gallery thirteen',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4309,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery thirteen | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-thirteen/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery thirteen | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-thirteen/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery2.jpg" />\n\t<meta property="og:image:width" content="600" />\n\t<meta property="og:image:height" content="363" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-thirteen/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery2.jpg","width":600,"height":363,"caption":"Teamdeville lotus cortina"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-thirteen/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-thirteen/","name":"Gallery thirteen | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-thirteen/#primaryimage"},"datePublished":"2019-09-02T21:24:53+00:00","dateModified":"2019-09-02T21:24:53+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-thirteen/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4308',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4309',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4308',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4306,
    date: '2019-09-02T22:23:11',
    date_gmt: '2019-09-02T21:23:11',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4306',
    },
    modified: '2019-09-02T22:23:11',
    modified_gmt: '2019-09-02T21:23:11',
    slug: 'gallery-twelve',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-twelve/',
    title: {
      rendered: 'Gallery twelve',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4307,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery twelve | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-twelve/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery twelve | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-twelve/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery3-1.jpg" />\n\t<meta property="og:image:width" content="1920" />\n\t<meta property="og:image:height" content="1440" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-twelve/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery3-1.jpg","width":1920,"height":1440,"caption":"Teamdeville lotus cortina"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-twelve/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-twelve/","name":"Gallery twelve | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-twelve/#primaryimage"},"datePublished":"2019-09-02T21:23:11+00:00","dateModified":"2019-09-02T21:23:11+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-twelve/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4306',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4307',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4306',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4304,
    date: '2019-09-02T22:22:11',
    date_gmt: '2019-09-02T21:22:11',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4304',
    },
    modified: '2019-09-02T22:22:11',
    modified_gmt: '2019-09-02T21:22:11',
    slug: 'gallery-eleven',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-eleven/',
    title: {
      rendered: 'Gallery eleven',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4305,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery eleven | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-eleven/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery eleven | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-eleven/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery1.jpg" />\n\t<meta property="og:image:width" content="1920" />\n\t<meta property="og:image:height" content="1440" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-eleven/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery1.jpg","width":1920,"height":1440,"caption":"Teamdeville formula one"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-eleven/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-eleven/","name":"Gallery eleven | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-eleven/#primaryimage"},"datePublished":"2019-09-02T21:22:11+00:00","dateModified":"2019-09-02T21:22:11+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-eleven/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4304',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4305',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4304',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4302,
    date: '2019-09-02T22:21:15',
    date_gmt: '2019-09-02T21:21:15',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4302',
    },
    modified: '2019-09-02T22:21:15',
    modified_gmt: '2019-09-02T21:21:15',
    slug: 'gallery-ten',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-ten/',
    title: {
      rendered: 'Gallery ten',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4303,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery ten | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-ten/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery ten | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-ten/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery7.jpg" />\n\t<meta property="og:image:width" content="1920" />\n\t<meta property="og:image:height" content="1440" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-ten/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery7.jpg","width":1920,"height":1440,"caption":"Teamdeville Fanny\'s rest stop"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-ten/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-ten/","name":"Gallery ten | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-ten/#primaryimage"},"datePublished":"2019-09-02T21:21:15+00:00","dateModified":"2019-09-02T21:21:15+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-ten/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4302',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4303',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4302',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4300,
    date: '2019-09-02T22:20:11',
    date_gmt: '2019-09-02T21:20:11',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4300',
    },
    modified: '2019-09-02T22:20:11',
    modified_gmt: '2019-09-02T21:20:11',
    slug: 'gallery-nine',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-nine/',
    title: {
      rendered: 'Gallery nine',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4301,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery nine | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-nine/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery nine | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-nine/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery8.jpg" />\n\t<meta property="og:image:width" content="1920" />\n\t<meta property="og:image:height" content="1440" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-nine/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery8.jpg","width":1920,"height":1440,"caption":"Teamdeville gallery photo"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-nine/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-nine/","name":"Gallery nine | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-nine/#primaryimage"},"datePublished":"2019-09-02T21:20:11+00:00","dateModified":"2019-09-02T21:20:11+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-nine/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4300',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4301',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4300',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4298,
    date: '2019-09-02T22:19:32',
    date_gmt: '2019-09-02T21:19:32',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4298',
    },
    modified: '2019-09-02T22:19:32',
    modified_gmt: '2019-09-02T21:19:32',
    slug: 'gallery-eight',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-eight/',
    title: {
      rendered: 'Gallery eight',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4299,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery eight | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-eight/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery eight | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-eight/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery9.jpg" />\n\t<meta property="og:image:width" content="1920" />\n\t<meta property="og:image:height" content="1440" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-eight/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery9.jpg","width":1920,"height":1440,"caption":"Teamdeville formula one"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-eight/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-eight/","name":"Gallery eight | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-eight/#primaryimage"},"datePublished":"2019-09-02T21:19:32+00:00","dateModified":"2019-09-02T21:19:32+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-eight/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4298',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4299',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4298',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4296,
    date: '2019-09-02T22:18:52',
    date_gmt: '2019-09-02T21:18:52',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4296',
    },
    modified: '2019-09-02T22:18:52',
    modified_gmt: '2019-09-02T21:18:52',
    slug: 'gallery-seven',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-seven/',
    title: {
      rendered: 'Gallery seven',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4297,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery seven | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-seven/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery seven | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-seven/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery10.jpg" />\n\t<meta property="og:image:width" content="600" />\n\t<meta property="og:image:height" content="800" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-seven/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery10.jpg","width":600,"height":800,"caption":"Teamdeville formula one"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-seven/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-seven/","name":"Gallery seven | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-seven/#primaryimage"},"datePublished":"2019-09-02T21:18:52+00:00","dateModified":"2019-09-02T21:18:52+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-seven/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4296',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4297',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4296',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4294,
    date: '2019-09-02T22:18:11',
    date_gmt: '2019-09-02T21:18:11',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4294',
    },
    modified: '2019-09-02T22:18:11',
    modified_gmt: '2019-09-02T21:18:11',
    slug: 'gallery-six',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-six/',
    title: {
      rendered: 'Gallery six',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4295,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery six | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-six/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery six | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-six/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery11.jpg" />\n\t<meta property="og:image:width" content="640" />\n\t<meta property="og:image:height" content="426" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-six/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery11.jpg","width":640,"height":426,"caption":"Teamdeville racing"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-six/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-six/","name":"Gallery six | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-six/#primaryimage"},"datePublished":"2019-09-02T21:18:11+00:00","dateModified":"2019-09-02T21:18:11+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-six/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4294',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4295',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4294',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4292,
    date: '2019-09-02T22:17:19',
    date_gmt: '2019-09-02T21:17:19',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4292',
    },
    modified: '2019-09-02T22:17:19',
    modified_gmt: '2019-09-02T21:17:19',
    slug: 'gallery-five',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-five/',
    title: {
      rendered: 'Gallery five',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4293,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery five | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-five/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery five | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-five/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery5.jpg" />\n\t<meta property="og:image:width" content="1920" />\n\t<meta property="og:image:height" content="1440" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-five/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery5.jpg","width":1920,"height":1440,"caption":"Teamdeville lotus cortina"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-five/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-five/","name":"Gallery five | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-five/#primaryimage"},"datePublished":"2019-09-02T21:17:19+00:00","dateModified":"2019-09-02T21:17:19+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-five/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4292',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4293',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4292',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
  {
    id: 4290,
    date: '2019-09-02T22:15:54',
    date_gmt: '2019-09-02T21:15:54',
    guid: {
      rendered: 'http://shamlewtak.com/?post_type=photos&#038;p=4290',
    },
    modified: '2019-09-02T22:15:54',
    modified_gmt: '2019-09-02T21:15:54',
    slug: 'gallery-four',
    status: 'publish',
    type: 'photos',
    link: 'http://teamdeville.co.uk/posts/photos/gallery-four/',
    title: {
      rendered: 'Gallery four',
    },
    content: {
      rendered: '',
      protected: false,
    },
    featured_media: 4291,
    template: '',
    acf: [],
    yoast_head:
      '<!-- This site is optimized with the Yoast SEO plugin v14.0.4 - https://yoast.com/wordpress/plugins/seo/ -->\n<title>Gallery four | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina</title>\n<meta name="robots" content="index, follow" />\n<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />\n<link rel="canonical" href="http://teamdeville.co.uk/posts/photos/gallery-four/" />\n<meta property="og:locale" content="en_GB" />\n<meta property="og:type" content="article" />\n<meta property="og:title" content="Gallery four | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:url" content="http://teamdeville.co.uk/posts/photos/gallery-four/" />\n<meta property="og:site_name" content="Teamdeville - Classic Ford Racing Parts including Anglia and Cortina" />\n<meta property="og:image" content="http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery4.jpg" />\n\t<meta property="og:image:width" content="1920" />\n\t<meta property="og:image:height" content="1440" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"http://teamdeville.co.uk/#organization","name":"Teamdeville - classic race parts","url":"http://teamdeville.co.uk/","sameAs":[],"logo":{"@type":"ImageObject","@id":"http://teamdeville.co.uk/#logo","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2020/04/Screenshot-2020-04-03-at-11.11.47.png","width":148,"height":74,"caption":"Teamdeville - classic race parts"},"image":{"@id":"http://teamdeville.co.uk/#logo"}},{"@type":"WebSite","@id":"http://teamdeville.co.uk/#website","url":"http://teamdeville.co.uk/","name":"Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","description":"Teamdeville - classic race parts","publisher":{"@id":"http://teamdeville.co.uk/#organization"},"potentialAction":[{"@type":"SearchAction","target":"http://teamdeville.co.uk/?s={search_term_string}","query-input":"required name=search_term_string"}],"inLanguage":"en-GB"},{"@type":"ImageObject","@id":"http://teamdeville.co.uk/posts/photos/gallery-four/#primaryimage","inLanguage":"en-GB","url":"http://teamdeville.co.uk/reactMonster/wp-content/uploads/2019/09/gallery4.jpg","width":1920,"height":1440,"caption":"Teamdeville gallery"},{"@type":"WebPage","@id":"http://teamdeville.co.uk/posts/photos/gallery-four/#webpage","url":"http://teamdeville.co.uk/posts/photos/gallery-four/","name":"Gallery four | Teamdeville - Classic Ford Racing Parts including Anglia and Cortina","isPartOf":{"@id":"http://teamdeville.co.uk/#website"},"primaryImageOfPage":{"@id":"http://teamdeville.co.uk/posts/photos/gallery-four/#primaryimage"},"datePublished":"2019-09-02T21:15:54+00:00","dateModified":"2019-09-02T21:15:54+00:00","inLanguage":"en-GB","potentialAction":[{"@type":"ReadAction","target":["http://teamdeville.co.uk/posts/photos/gallery-four/"]}]}]}</script>\n<!-- / Yoast SEO plugin. -->',
    _links: {
      self: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos/4290',
        },
      ],
      collection: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/photos',
        },
      ],
      about: [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/types/photos',
        },
      ],
      'wp:featuredmedia': [
        {
          embeddable: true,
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media/4291',
        },
      ],
      'wp:attachment': [
        {
          href: 'http://teamdeville.co.uk/wp-json/wp/v2/media?parent=4290',
        },
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true,
        },
      ],
    },
  },
];

const mockStore = configureMockStore();
jest.mock('axios');
axios.get.mockResolvedValue({ data: MOCKED_PHOTOS });

const initialStore = mockStore({
  serverErrorState: {
    hasServerError: false,
  },
});

const mountComponent = (store) =>
  mount(
    <BrowserRouter>
      <Provider store={store}>
        <ToastProvider>
          <PhotoGallery />
        </ToastProvider>
      </Provider>
    </BrowserRouter>
  );

describe('PhotoGallery', () => {
  it('renders PhotoGallery component without crash', async () => {
    const container = mountComponent(initialStore);
    await act(async () => {
      container;
    });

    expect(container.length).toBe(1);
  });
  it('should show <Loader /> while loading data', async () => {
    const container = mountComponent(initialStore);
    await act(async () => {
      container;
    });
    const spinner = findByTestAttr(container, 'pageLoader');
    expect(spinner.length).toBe(1);
  });

  it('pageLoader set to true', async () => {
    const container = mountComponent(initialStore);
    await act(async () => {
      container;
    });
    expect(
      container.find('[data-test="pageLoader"]').prop('isLoading')
    ).toEqual(true);
  });

  it('fetch PhotoGallery content async call', async () => {
    const container = mountComponent(initialStore);
    await act(async () => {
      container;
    });
    container.update();
    const section = findByTestAttr(container, 'photo-gallery-section');
    expect(section.length).toBe(1);
  });
});
