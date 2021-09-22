
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
