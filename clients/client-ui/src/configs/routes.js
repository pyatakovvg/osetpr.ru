
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
  {
    path: '/comments',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "client-comments" */
      '@modules/client-comments'
    ),
  },
  {
    path: '/about',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "client-about" */
      '@modules/client-about'
    ),
  },
];

export default routes;
