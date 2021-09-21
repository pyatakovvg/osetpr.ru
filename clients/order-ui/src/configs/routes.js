
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "orders" */
      '@modules/order-main'
    ),
  },
  {
    path: '/orders',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "orders" */
      '@modules/order-orders'
    ),
  },
  {
    path: '/orders/create',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "order-modify" */
      '@modules/order-order-modify'
    ),
  },
  {
    path: '/orders/:uuid',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "order-modify" */
      '@modules/order-order-modify'
    ),
  },
  {
    path: '/sign-in',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "sign-in" */
      '@modules/order-sign-in'
    ),
  },
  {
    path: '/sign-up',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "sign-up" */
      '@modules/order-sign-up'
    ),
  },
];

export default routes;
