
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
      /* webpackChunkName: "mobile-order" */
      '@modules/mobile-order'
    ),
  },
];

export default routes;
