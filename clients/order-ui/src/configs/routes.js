
const routes = [
  {
    path: '/',
    wrapper: 'Navigate',
    module: import(
      /* webpackChunkName: "shops" */
      '@modules/order-main'
    ),
  },
  {
    path: '/sign-in',
    module: import(
      /* webpackChunkName: "shops" */
      '@modules/order-sign-in'
    ),
  },
];

export default routes;
