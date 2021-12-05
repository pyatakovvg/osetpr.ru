
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
    path: '/orders/:uuid',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "client-order" */
      '@modules/client-order'
    ),
  },
];

export default routes;
