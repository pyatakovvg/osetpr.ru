
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
    path: '/order',
    wrapper: 'Empty',
    module: import(
      /* webpackChunkName: "client-main" */
      '@modules/client-main'
    ),
  },
];

export default routes;
