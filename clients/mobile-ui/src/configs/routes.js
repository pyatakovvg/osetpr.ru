
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
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "client-main" */
      '@modules/mobile-order'
    ),
  },
];

export default routes;
