
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "mobile-main" */
      '@modules/mobile-main'
    ),
  },
  {
    path: '/products/:uuid',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "mobile-product" */
      '@modules/mobile-product'
    ),
  },
  {
    path: '/order',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "mobile-order-draft" */
      '@modules/mobile-order-draft'
    ),
  },
  {
    path: '/order/:uuid',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "mobile-order" */
      '@modules/mobile-order'
    ),
  },
  {
    path: '/about',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "mobile-about" */
      '@modules/mobile-about'
    ),
  },
  {
    path: '/comments',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "mobile-comments" */
      '@modules/mobile-comments'
    ),
  },
];

export default routes;
