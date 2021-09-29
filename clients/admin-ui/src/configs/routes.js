
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-main" */
      '@modules/admin-main'
    ),
  },
  {
    path: '/orders',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-orders" */
      '@modules/admin-orders'
    ),
  },
  {
    path: '/orders/create',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-order" */
      '@modules/admin-order'
    ),
  },
  {
    path: '/orders/:uuid',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-order" */
      '@modules/admin-order'
    ),
  },
  {
    path: '/products/create',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-product" */
      '@modules/admin-product'
    ),
  },
  {
    path: '/products/:uuid',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-product" */
      '@modules/admin-product'
    ),
  },
  {
    path: '/products',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-products" */
      '@modules/admin-products'
    ),
  },
  {
    path: '/gallery',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-gallery" */
      '@modules/admin-gallery'
    ),
  },
  {
    path: '/customers',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "admin-customers" */
      '@modules/admin-customers'
    ),
  },
  {
    path: '/sign-in',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "admin-sign-in" */
      '@modules/admin-sign-in'
    ),
  },
];

export default routes;
