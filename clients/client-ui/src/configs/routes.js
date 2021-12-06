
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "client-main" */
      '@modules/client-main'
    ),
  },
  {
    path: '/products/:uuid',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "client-product" */
      '@modules/client-product'
    ),
  },
  {
    path: '/order',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "client-order-draft" */
      '@modules/client-order-draft'
    ),
  },
  {
    path: '/orders/:uuid',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "client-order" */
      '@modules/client-order'
    ),
  },
];

export default routes;
